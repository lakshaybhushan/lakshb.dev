import type { APIRoute } from "astro";
import Groq from "groq-sdk";
import { getKnowledgeBase } from "../../db/queries";

export const prerender = false;

const groq = new Groq({
	apiKey: import.meta.env.GROQ_API_KEY,
});

const aboutMe = await getKnowledgeBase();

export const POST: APIRoute = async ({ request }) => {
	try {
		const { message, history } = await request.json();
		const chatCompletion = await groq.chat.completions.create({
			messages: [
				...history,
				{
					role: "system",
					content: aboutMe,
				},
				{
					role: "assistant",
					content:
						"Semibold the important words in a sentence and answer should be precise and as concise as possible. Stick to the points mentioned. Avoid unnecessary details.",
				},
				{ role: "user", content: message },
			],
			temperature: 0.5,
			model: "llama-3.1-8b-instant",
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
