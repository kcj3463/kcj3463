export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const text = req.query.text;

  if (!apiKey || !text) {
    return res.status(400).json({ error: "API key or text missing" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `다음을 한국어로 요약:\n\n${text}` }],
        temperature: 0.7
      })
    });

    const result = await response.json();
    const summary = result.choices?.[0]?.message?.content?.trim() || "요약 실패";

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
