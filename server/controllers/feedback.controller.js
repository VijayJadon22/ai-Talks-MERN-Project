import Feedback from "../models/feedback.model.js";


export const generateAIFeedback = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user._id;
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required." });
        }
        const response = await fetch("https://api.studio.nebius.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NEBIUS_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-Coder-7B", // correct model name
                messages: [
                    { role: "system", content: "You are a concise AI assistant. Only respond in a single, short sentence." },
                    { role: "user", content: prompt }
                ]

            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Nebius API error:", errorText);
            return res.status(response.status).json({ success: false, message: "API error", details: errorText });
        }

        const data = await response.json();
        const aiOutput = data.choices?.[0]?.message?.content || "No response generated.";

        console.log("aiOutput", aiOutput);

        await Feedback.create({
            userId,
            user_input: prompt.trim(),
            feedback: aiOutput.trim(),
        });

        return res.status(200).json({
            success: true,
            message: "Response generated",
            response: aiOutput,
        });
    } catch (error) {
        console.error("AI generation error:", error);
        return res.status(500).json({ success: false, message: "Failed to generate response" });

    }
}