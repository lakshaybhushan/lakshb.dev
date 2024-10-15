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