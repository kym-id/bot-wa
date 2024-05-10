async function send({
  path,
  body,
  method = "POST",
}: {
  path: string;
  body: Object;
  method?: string;
}) {
  return await fetch(`${process.env.WA_BOT_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WA_BOT_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
}

export async function addToGroup({ gid, jid }: { jid: string; gid: string }) {
  const res = await send({
    path: `/group/updateParticipant/${process.env.WA_BOT_INSTANCE}?groupJid=${gid}`,
    body: {
      action: "add",
      participants: [jid],
    },
    method: "PUT",
  });
  return res;
}

export async function sendMessage({
  jid,
  message,
}: {
  jid: string;
  message: string;
}) {
  const res = await send({
    path: `/message/sendText/${process.env.WA_BOT_INSTANCE}`,
    body: {
      number: jid,
      options: {
        delay: 1200,
        presence: "composing",
      },
      textMessage: {
        text: message,
      },
    },
    method: "POST",
  });
  return res;
}
