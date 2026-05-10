import { NextRequest, NextResponse } from "next/server";
import { getBotToken, getOwnerChatId, sendTelegramMessage } from "@/lib/telegram";

interface LeadForm {
  name: string;
  phone: string;
  city?: string;
  business?: string;
  comment?: string;
  source?: string;
}

export async function POST(req: NextRequest) {
  const token = getBotToken();
  const chatId = getOwnerChatId();
  if (!token || !chatId) {
    console.error("Telegram credentials not configured");
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  let form: LeadForm;
  try {
    form = (await req.json()) as LeadForm;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!form?.name || !form?.phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const text = [
    "🚀 *Новая заявка — запуск бизнеса*",
    "",
    `👤 *Имя:* ${form.name}`,
    `📞 *Телефон:* ${form.phone}`,
    form.city ? `📍 *Город:* ${form.city}` : null,
    form.business ? `💼 *Формат:* ${form.business}` : null,
    form.comment ? `💬 *Комментарий:* ${form.comment}` : null,
    form.source ? `🔗 *Источник:* ${form.source}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const result = await sendTelegramMessage(chatId, text);
  if (!result.ok) {
    console.error("Telegram API error:", result.error);
    return NextResponse.json({ error: "Telegram delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
