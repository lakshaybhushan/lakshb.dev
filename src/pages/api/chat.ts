import type { APIRoute } from "astro";
import Groq from "groq-sdk";
import { promises as fs } from "fs";
import path from "path";

const groq = new Groq({
	apiKey: import.meta.env.GROQ_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const { message, history } = await request.json();

		const contextFilePath = path.resolve("public/docs/context.txt");
		const systemContent = await fs.readFile(contextFilePath, "utf-8");

		const chatCompletion = await groq.chat.completions.create({
			messages: [
				...history,
				{
					role: "system",
					content:
						systemContent +
						"Provide answers exclusively in plain text format. Also make the answers in best format possible and avoid using any special characters. Answer should be in first person format.",
				},
				{ role: "user", content: message },
			],
			model: "llama3-8b-8192",
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
