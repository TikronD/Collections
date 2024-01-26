import React from "react";
import "./message.css";
import AddMessageButton from "@/components/AddMessageButton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddMessage() {
  async function handleMessage(formData) {
    "use server";
    const title = formData.get("title");
    const message = formData.get("message");

    await sql`INSERT INTO collection (game, price, extras, boughtnew) VALUES (${title}, ${message})`;

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Message Board</h2>
      <hr />
      <form action={handleMessage}>
        <lable htmlFor="title">Title:</lable>
        <input name="title" id="title" placeholder="Enter a topic" />
        <lable htmlFor="message">Message:</lable>
        <input className="textbox" name="message" id="message" />
        <AddMessageButton />
      </form>
    </div>
  );
}
