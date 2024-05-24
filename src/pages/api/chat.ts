import type { APIRoute } from "astro";
import Groq from "groq-sdk";

const groq = new Groq({
	apiKey: import.meta.env.GROQ_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const { message, history } = await request.json();

		const chatCompletion = await groq.chat.completions.create({
			messages: [...history, { role: "user", content: message }],
			model: "gemma-7b-it",
			stream: true,
		});

		let reply = "";

		for await (const chunk of chatCompletion) {
			reply += chunk.choices[0]?.delta?.content || "";
		}

		return new Response(JSON.stringify({ reply }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
