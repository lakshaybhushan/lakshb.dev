import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const knowledgeBase = sqliteTable("KB", {
	id: text("id").primaryKey(),
	content: text("content").notNull(),
});
