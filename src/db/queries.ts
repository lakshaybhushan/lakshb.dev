import { eq } from "drizzle-orm";
import { db } from "./index";
import { knowledgeBase } from "./schema";

// Select content from the knowledgeBase table

export async function getKnowledgeBase() {
	const kb = await db
		.select()
		.from(knowledgeBase)
		.where(eq(knowledgeBase.id, "knowledge.txt"))
		.get();
	return kb?.content;
}
