import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Multiple chat IDs separated by commas in env
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS?.split(',') || [];

export async function POST(request: Request) {
  try {
    const { message, type } = await request.json();

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('CRITICAL: TELEGRAM_BOT_TOKEN is not defined in .env.local');
      return NextResponse.json({ error: 'Bot token missing' }, { status: 500 });
    }

    if (TELEGRAM_CHAT_IDS.length === 0 || !TELEGRAM_CHAT_IDS[0]) {
      console.error('CRITICAL: TELEGRAM_CHAT_IDS is not defined in .env.local');
      return NextResponse.json({ error: 'Chat IDs missing' }, { status: 500 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';
    const timestamp = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

    const title = type === 'cart' ? 'CART ADDITION' : 'CHECKOUT ACCESS';
    
    const formattedMessage = [
      `*${title}*`,
      `──────────────────`,
      message,
      `──────────────────`,
      `Time: ${timestamp}`,
      `IP: \`${ip}\``
    ].join('\n');

    const sendPromises = TELEGRAM_CHAT_IDS.map(async (chatId) => {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId.trim(),
          text: formattedMessage,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error(`Telegram API error for chat ${chatId}:`, result);
      }
      return result;
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send telegram log:', error);
    return NextResponse.json({ error: 'Failed to send log' }, { status: 500 });
  }
}
