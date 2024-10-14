import type { APIRoute } from "astro";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import aboutMe from "../../utils/aboutMe";

export const prerender = false;

const openai = createOpenAI({
	apiKey: import.meta.env.OPENAI_API_KEY, 
});

export const POST: APIRoute = async ({ request }) => {
	const { messages } = await request.json();

	const result = await streamText({
		model: openai("gpt-4o-mini"),
		system: aboutMe(),
		temperature: 0.5,
		messages: convertToCoreMessages(messages),
	});

	return result.toDataStreamResponse();
};

// export const POST: APIRoute = async ({ request }) => {
// 	try {
// 		const { message, history } = await request.json();
// 		const chatCompletion = await openai.chat.completions.create({
// 			messages: [
// 				...history,
// 				{
// 					role: "system",
// 					content: aboutMe,
// 				},
// 				{
// 					role: "assistant",
// 					content:
// 						"Semibold the important words in a sentence and answer should be precise and as concise as possible. Stick to the points mentioned. Avoid unnecessary details.",
// 				},
// 				{ role: "user", content: message },
// 			],
// 			temperature: 0.5,
// 			model: "gpt-4o-mini",
// 			stream: true,
// 		});

// 		let reply = "";

// 		for await (const chunk of chatCompletion) {
// 			reply += chunk.choices[0]?.delta?.content || "";
// 		}

// 		return new Response(JSON.stringify({ reply }), {
// 			status: 200,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 	} catch (error: any) {
// 		return new Response(JSON.stringify({ error: error.message }), {
// 			status: 500,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 	}
// };
