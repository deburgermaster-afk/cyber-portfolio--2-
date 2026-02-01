// Cloudflare Pages Function - Visitor Notification
// This runs server-side on Cloudflare, not in the browser

export async function onRequest(context) {
  const { request } = context;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const data = await request.json();
    
    // Get visitor info from Cloudflare (server-side, accurate)
    const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
    const country = request.headers.get('CF-IPCountry') || 'Unknown';
    const city = request.cf?.city || 'Unknown';
    const region = request.cf?.region || 'Unknown';
    
    const location = `${city}, ${region}, ${country}`;
    const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
    
    // Send email via MailChannels (free with Cloudflare)
    const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'istiak.ahmed.tj@gmail.com', name: 'Istiak Ahmed' }],
          },
        ],
        from: {
          email: 'notifications@thetj.dev',
          name: 'Portfolio Notification',
        },
        subject: `🌐 Portfolio Visitor from ${location}`,
        content: [
          {
            type: 'text/html',
            value: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #00d4ff, #9b59b6); padding: 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px;">🔔 New Portfolio Visitor</h1>
                </div>
                <div style="padding: 30px;">
                  <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                    <h3 style="color: #00d4ff; margin-top: 0;">📍 Visitor Details</h3>
                    <table style="width: 100%; color: #fff;">
                      <tr>
                        <td style="padding: 8px 0; color: #888;">IP Address:</td>
                        <td style="padding: 8px 0; font-family: monospace;">${ip}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888;">Location:</td>
                        <td style="padding: 8px 0;">${location}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888;">Device:</td>
                        <td style="padding: 8px 0;">${data.device || 'Unknown'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888;">Browser:</td>
                        <td style="padding: 8px 0;">${data.browser || 'Unknown'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888;">Page:</td>
                        <td style="padding: 8px 0;">${data.page || 'Homepage'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888;">Time (BD):</td>
                        <td style="padding: 8px 0;">${time}</td>
                      </tr>
                    </table>
                  </div>
                  <p style="color: #888; font-size: 12px; text-align: center; margin: 0;">
                    Sent from your portfolio at thetj.dev
                  </p>
                </div>
              </div>
            `,
          },
        ],
      }),
    });

    if (emailResponse.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } else {
      const error = await emailResponse.text();
      console.error('Email error:', error);
      return new Response(JSON.stringify({ success: false, error }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
