import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderForm {
  company: string;
  entity_type: string;
  inn: string;
  kpp?: string;
  legal_address?: string;
  contact_name: string;
  contact_role?: string;
  phone: string;
  email: string;
  telegram?: string;
}

const entityLabels: Record<string, string> = {
  ooo: "ООО",
  ip: "ИП",
  ao: "АО / ПАО",
  other: "Другое",
};

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Telegram credentials not configured");
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  let body: { items: OrderItem[]; form: OrderForm };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { items, form } = body;

  if (!form?.company || !form?.inn || !form?.phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entityLabel = entityLabels[form.entity_type] ?? form.entity_type;

  const itemsBlock = items?.length
    ? `📦 *Товары:*\n${items.map(item => `• ${item.name} × ${item.qty}`).join("\n")}`
    : "📦 *Товары:* не выбраны";

  const lines = [
    "🛒 *Новая заявка с сайта*",
    "",
    itemsBlock,
    "",
    `🏢 *Компания:* ${form.company} (${entityLabel})`,
    `📋 *ИНН:* ${form.inn}`,
    form.kpp ? `📋 *КПП:* ${form.kpp}` : null,
    form.legal_address ? `📍 *Адрес:* ${form.legal_address}` : null,
    "",
    `👤 *Контакт:* ${form.contact_name}${form.contact_role ? ` (${form.contact_role})` : ""}`,
    `📞 *Телефон:* ${form.phone}`,
    `📧 *E-mail:* ${form.email}`,
    form.telegram ? `✈️ *Telegram:* ${form.telegram}` : null,
  ]
    .filter(line => line !== null)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: lines,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", err);
    return NextResponse.json({ error: "Telegram delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
