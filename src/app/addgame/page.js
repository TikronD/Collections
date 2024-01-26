import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SaveGameButton from "@/components/SaveGameButton.js";
import "./addgame.css";
import Link from "next/link";

export default function AddGame() {
  async function handleAddGame(formData) {
    // get information from server
    "use server";
    const game = formData.get("game");
    const price = formData.get("price");
    const extras = formData.get("extras");
    const boughtnew = formData.get("boughtnew");

    console.log(game, price, extras, boughtnew);

    // Make a new SQL request to the server who is running this code
    await sql`INSERT INTO collection (game, price, extras, boughtnew) VALUES (${game}, ${price}, ${extras}, ${boughtnew})`;

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Add a Boardgame</h2>
      <nav>
        <Link href="/">Original</Link>
      </nav>
      <hr />
      <form action={handleAddGame}>
        <label htmlFor="game">Name:</label>
        <input name="game" id="game" placeholder="Name of game" />
        <label htmlFor="price">Purchase price:</label>
        <input name="price" id="price" placeholder="price paid" />
        <label htmlFor="extras">Extras:</label>
        <input name="extras" id="extras" placeholder="Sleeves, Insert, etc" />
        <label htmlFor="boughtnew">Bought New:</label>
        <div className="radiobtn">
          <input
            type="radio"
            id="boughtnew-true"
            name="boughtnew"
            value={true}
          />
          <label htmlFor="boughtnew-true">Yes</label>
          <input
            type="radio"
            id="boughtnew-false"
            name="boughtnew"
            value={false}
          />
          <label htmlFor="boughtnew-false">No</label>
          <SaveGameButton />
        </div>
      </form>
    </div>
  );
}
