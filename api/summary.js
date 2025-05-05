import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "sk-...sdYA", // 여기에 실제 API 키 입력
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "No input text provided." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "다음 문장을 간결하게 요약해 주세요." },
        { role: "user", content: text },
      ],
    });

    const summary = completion.data.choices[0].message.content.trim();
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Summary generation failed." });
  }
}
