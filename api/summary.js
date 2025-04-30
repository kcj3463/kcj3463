export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "text 파라미터가 필요합니다." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `다음 내용을 요약해줘:\n${text}` }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "요약 실패", detail: data });
    }

    return res.status(200).json({ summary: data.choices[0].message.content });

  } catch (error) {
    return res.status(500).json({ error: "서버 오류", detail: error.message });
  }
}
