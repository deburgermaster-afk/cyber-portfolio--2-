// Cloudflare Pages Function - Visitor Notification
// Uses Resend API (free 100 emails/day) or logs to console for debugging

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
    
    const visitorData = {
      ip,
      location,
      device: data.device || 'Unknown',
      browser: data.browser || 'Unknown',
      page: data.page || '/',
      time,
      referrer: data.referrer || 'Direct',
    };

    // Log to Cloudflare (visible in dashboard)
    console.log('VISITOR:', JSON.stringify(visitorData));

    // Try to send via webhook (you can set this up with Zapier, Make, or n8n for free)
    // For now, we'll store in Cloudflare KV if available, or just log
    
    // Attempt MailChannels
    try {
      const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: 'istiak.ahmed.tj@gmail.com' }] }],
          from: { email: 'visitor@thetj.dev', name: 'Portfolio Visitor' },
          subject: `🌐 Visitor from ${location} (${ip})`,
          content: [{
            type: 'text/plain',
            value: `New visitor on your portfolio!\n\nIP: ${ip}\nLocation: ${location}\nDevice: ${data.device}\nBrowser: ${data.browser}\nTime: ${time}\nPage: ${data.page}\nReferrer: ${data.referrer}`
          }],
        }),
      });
      
      const emailResult = await emailResponse.text();
      console.log('MailChannels response:', emailResponse.status, emailResult);
    } catch (emailError) {
      console.log('MailChannels error:', emailError.message);
    }

    return new Response(JSON.stringify({ success: true, logged: visitorData }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
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
