
import { getSystemPrompt } from "../prompt.js";
import { genAI } from "../../index.js";

const chatController = async (req, res) => {
  try {
    const rawMessages = req.body.messages;

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return res.status(400).json({
        error: "Invalid or empty 'messages'. Please provide input.",
      });
    }

    const filteredMessages = rawMessages.filter((message) =>
      message.parts?.some((part) => part.text?.trim().length > 0)
    );

    if (filteredMessages.length === 0) {
      return res.status(400).json({
        code: "You haven't provided any valid content to respond to.",
      });
    }

    for (const message of filteredMessages) {
      if (!message.role || !Array.isArray(message.parts)) {
        return res.status(400).json({
          error:
            "Invalid message format. Each message must have a 'role' and 'parts' array.",
        });
      }
    }

    // Add instructional message to improve format quality
    filteredMessages.unshift({
      role: "user",
      parts: [
        {
          text: `
Please respond with valid XML only, using <boltArtifact> and <boltAction> tags.
Do not use markdown code blocks (\`\`\`).
Only respond with the custom XML structure.
        `.trim(),
        },
      ],
    });

    console.log(
      "✅ Messages received:",
      JSON.stringify(filteredMessages, null, 2)
    );

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: filteredMessages,
      config: {
        maxOutputTokens: 20000,
        temperature: 0.7,
      },
      systemInstruction: getSystemPrompt(),
    });

    let aiText = response.text.trim();

    // Optional: Remove markdown formatting fences if present
    aiText = aiText.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1");

    console.log("✅ Final AI response:", aiText);

    res.status(200).json({
      uiPrompts: [aiText],
    });
  } catch (err) {
    console.error("🔥 Error in chatController:", err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message, stack: err.stack });
    } else {
      res.status(500).json({ error: "Unknown server error", raw: err });
    }
  }
};

export default chatController;
