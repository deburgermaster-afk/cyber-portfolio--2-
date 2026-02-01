// Cloudflare Pages Function - Visitor Notification via Telegram
// Free, instant, no email setup needed

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
    
    // Get visitor info from Cloudflare headers
    const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
    const country = request.headers.get('CF-IPCountry') || 'Unknown';
    const city = request.cf?.city || 'Unknown';
    const region = request.cf?.region || 'Unknown';
    
    const location = `${city}, ${region}, ${country}`;
    const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
    
    // Format message for Telegram
    const message = `🌐 *New Portfolio Visitor*

📍 *Location:* ${location}
🔗 *IP:* \`${ip}\`
💻 *Device:* ${data.device || 'Unknown'}
🌐 *Browser:* ${data.browser || 'Unknown'}
📄 *Page:* ${data.page || '/'}
🔄 *Referrer:* ${data.referrer || 'Direct'}
⏰ *Time (BD):* ${time}`;

    // Send to Telegram (you'll set up a bot)
    // For now, log to console (visible in Cloudflare dashboard)
    console.log('VISITOR NOTIFICATION:', message);

    // You can add Telegram bot later with:
    // TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as environment variables
    const botToken = context.env?.TELEGRAM_BOT_TOKEN;
    const chatId = context.env?.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
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
