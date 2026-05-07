import { NextRequest, NextResponse } from "next/server";
import { getOwnerChatId, sendTelegramMessage } from "@/lib/telegram";

export const dynamic = "force-dynamic";

interface TelegramUser {
  id: number;
  first_name?: string;
  username?: string;
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: { id: number; type: string };
  text?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expectedSecret) {
    const got = req.headers.get("x-telegram-bot-api-secret-token");
    if (got !== expectedSecret) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const msg = update.message ?? update.edited_message;
  if (!msg || !msg.from) return NextResponse.json({ ok: true });

  const ownerId = getOwnerChatId();
  const fromId = String(msg.from.id);
  const chatId = msg.chat.id;

  if (!ownerId) {
    await sendTelegramMessage(
      chatId,
      `⚠️ Бот не настроен. Твой Telegram ID: \`${fromId}\`\nДобавь его в переменную ALLOWED_TELEGRAM_USER_ID.`,
    );
    return NextResponse.json({ ok: true });
  }

  if (fromId !== String(ownerId)) {
    await sendTelegramMessage(chatId, "⛔ Доступ запрещён.");
    return NextResponse.json({ ok: true });
  }

  const text = (msg.text ?? "").trim();
  const cmd = text.split(/\s+/)[0]?.toLowerCase();

  switch (cmd) {
    case "/start":
      await sendTelegramMessage(
        chatId,
        [
          "👋 Привет! Бот готов принимать заявки с сайта.",
          "",
          `Твой ID: \`${fromId}\``,
          "Команды:",
          "• /id — показать твой Telegram ID",
          "• /ping — проверка связи",
        ].join("\n"),
      );
      break;
    case "/id":
      await sendTelegramMessage(chatId, `🆔 Твой ID: \`${fromId}\``);
      break;
    case "/ping":
      await sendTelegramMessage(chatId, "🏓 pong");
      break;
    default:
      await sendTelegramMessage(chatId, "Неизвестная команда. Доступно: /start /id /ping");
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, status: "telegram webhook alive" });
}
