import React from "react";
import { sql } from "@vercel/postgres";
import "./message.css";
import AddMessageButton from "@/components/AddMessageButton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AddMessage({ params }) {
  // Get all message from message database with collection_id matching requested id
  const collection =
    await sql`SELECT * FROM messages WHERE collection_id = ${params.id}`;
  const gametitle = await sql`SELECT * FROM collection WHERE id = ${params.id}`;

  // to store title and message from form into database
  async function handleMessage(formData) {
    "use server";
    const title = formData.get("title");
    const message = formData.get("message");

    await sql`INSERT INTO messages (title, message, collection_id) VALUES (${title}, ${message}, ${params.id} )`;

    revalidatePath(`/message/${params.id}`);
    redirect("/");
  }

  async function handleDeleteComment(formData) {
    "use server";
    const collectionId = formData.get("collectionId");
    await sql`DELETE FROM messages WHERE id = ${collectionId}`;
    revalidatePath(`/message/${params.id}`);
  }

  return (
    <div>
      {/* [0] allows to access items in an array, so we can get the gametitle */}
      <h2>{gametitle.rows[0].game}</h2>
      <hr />
      <form action={handleMessage}>
        <label htmlFor="title">Title:</label>
        <input name="title" id="title" placeholder="Enter a topic" />
        {/* <label htmlFor="message">Message:</label>
        <input className="textbox" name="message" id="message" /> */}
        <label for="message">Tell us how you heard about HubSpot:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter text here..."
          rows="4"
          cols="50"
        />
        <AddMessageButton />
      </form>
      <hr />
      <h2>Comments</h2>
      {collection.rows.map((collection) => {
        return (
          <div key={collection.title} className="title">
            <Link href={`/message/${collection.id}`}>
              <h4>{collection.game}</h4>
            </Link>
            <div className="detail">
              <h3>{collection.title}</h3>
              <h4>{collection.message}</h4>
              <form action={handleDeleteComment}>
                <input
                  className="hidefield"
                  name="collectionId"
                  value={collection.id}
                />
                <button>Delete</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
