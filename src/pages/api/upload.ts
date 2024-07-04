import type { APIRoute } from "astro";
import { db } from "../../db/index";
import { knowledgeBase } from "../../db/schema";
import { eq } from "drizzle-orm";

export const prerender = false;

const UPLOAD_SECRET = import.meta.env.UPLOAD_SECRET;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const secretInput = formData.get("secret") as string;

    console.log("Received file:", file?.name);
    console.log("Received secret:", secretInput);

    if (secretInput !== UPLOAD_SECRET) {
      console.log("Invalid secret provided");
      return new Response(JSON.stringify({ error: "Invalid secret" }), {
        status: 403,
      });
    }

    if (!file) {
      console.log("No file uploaded");
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const content = await file.text();
    const fileId = file.name;

    console.log("File content length:", content.length);
    console.log("File ID:", fileId);

    const existingFile = await db
      .select()
      .from(knowledgeBase)
      .where(eq(knowledgeBase.id, fileId))
      .get();

    if (existingFile) {
      console.log("Updating existing file");
      await db
        .update(knowledgeBase)
        .set({ content: content })
        .where(eq(knowledgeBase.id, fileId));
    } else {
      console.log("Inserting new file");
      await db.insert(knowledgeBase).values({
        id: fileId,
        content: content,
      });
    }

    return new Response(
      JSON.stringify({ message: "File processed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing file:", error);
    return new Response(JSON.stringify({ error: "Failed to process" }), {
      status: 500,
    });
  }
};