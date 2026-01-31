import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

// Helper function to fetch geolocation with multiple fallback providers
async function fetchGeolocationWithFallbacks(ip: string) {
  const providers = [
    // Provider 1: ip-api.com (no key required, fast)
    async () => {
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,region,org,lat,lon`, {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      if (data.status === 'success') {
        return {
          ip: ip,
          country: data.country,
          city: data.city,
          region: data.region,
          isp: data.org,
          latitude: data.lat,
          longitude: data.lon,
        };
      }
      throw new Error('API returned non-success status');
    },

    // Provider 2: ipapi.co
    async () => {
      const response = await fetch(`https://ipapi.co/${ip}/json/`, {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      return {
        ip: data.ip || ip,
        country: data.country_name,
        city: data.city,
        region: data.region,
        isp: data.org,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    },

    // Provider 3: geoip-db.com
    async () => {
      const response = await fetch(`https://geoip-db.com/json/${ip}`, {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      return {
        ip: data.IPv4,
        country: data.country_name,
        city: data.city,
        region: data.state,
        isp: data.isp || 'Unknown',
        latitude: data.latitude,
        longitude: data.longitude,
      };
    },

    // Provider 4: ipwhois.io
    async () => {
      const response = await fetch(`https://ipwhois.io/json/?ip=${ip}`, {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      if (data.success) {
        return {
          ip: data.ip,
          country: data.country,
          city: data.city,
          region: data.region,
          isp: data.isp,
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
      throw new Error('API returned non-success status');
    },

    // Provider 5: Fallback - use local IP extraction only
    async () => {
      return {
        ip: ip,
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        isp: 'Unknown',
        latitude: null,
        longitude: null,
      };
    },
  ];

  // Try each provider in sequence
  for (const provider of providers) {
    try {
      console.log(`[Geolocation] Attempting provider...`);
      const result = await provider();
      console.log(`[Geolocation] Success:`, result);
      return result;
    } catch (error) {
      console.error(`[Geolocation] Provider failed:`, error instanceof Error ? error.message : error);
      continue;
    }
  }

  // Ultimate fallback
  return {
    ip: ip,
    country: 'Unknown',
    city: 'Unknown',
    region: 'Unknown',
    isp: 'Unknown',
    latitude: null,
    longitude: null,
  };
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  visitor: router({
    getInfo: publicProcedure.query(async ({ ctx }) => {
      try {
        // Extract client IP from various headers
        let ip = 'Unknown';
        
        // Try different header sources
        const forwardedFor = ctx.req.headers['x-forwarded-for'];
        if (forwardedFor) {
          ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(',')[0].trim();
        } else if (ctx.req.headers['x-real-ip']) {
          ip = Array.isArray(ctx.req.headers['x-real-ip']) 
            ? ctx.req.headers['x-real-ip'][0] 
            : ctx.req.headers['x-real-ip'];
        } else if (ctx.req.headers['cf-connecting-ip']) {
          ip = Array.isArray(ctx.req.headers['cf-connecting-ip'])
            ? ctx.req.headers['cf-connecting-ip'][0]
            : ctx.req.headers['cf-connecting-ip'];
        } else if (ctx.req.socket?.remoteAddress) {
          ip = ctx.req.socket.remoteAddress;
        }

        console.log(`[Visitor] Extracted IP: ${ip}`);

        // Fetch geolocation with fallbacks
        const geoData = await fetchGeolocationWithFallbacks(ip);
        
        return geoData;
      } catch (error) {
        console.error('[Visitor] Error in getInfo:', error instanceof Error ? error.message : error);
        return {
          ip: 'Unknown',
          country: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          isp: 'Unknown',
          latitude: null,
          longitude: null,
        };
      }
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
