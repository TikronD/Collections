import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Home({ searchParams }) {
  let collection = await sql`SELECT * FROM collection`;

  if (searchParams.sort === "name") {
    collection.rows.sort((a, b) => a.game.localeCompare(b.game));
  }

  if (searchParams.sort === "pricedec") {
    collection.rows.sort((a, b) => b.price - a.price);
  }
  if (searchParams.sort === "priceasc") {
    collection.rows.sort((a, b) => a.price - b.price);
  }

  // if (searchParams.sort === "reverse") {
  //   collection.rows.reverse();
  // }

  return (
    <div>
      <h2>My Board Games</h2>
      <nav>
        <Link href="/">Original</Link>
        {/* <Link href="/?sort=reverse">Reverse</Link> */}
        <Link href={`/?sort=name`}>Sort A-Z</Link>
        <Link href={`/?sort=pricedec`}>Price High-Low</Link>
        <Link href={`/?sort=priceasc`}>Price Low-High</Link>
      </nav>
      <hr />
      {collection.rows.map((collection) => {
        return (
          <div key={collection.game} className="post">
            <h4>{collection.game}</h4>
            <div className="detail">
              <p>Price: £{collection.price}</p>
              <p>Extras: {collection.extras}</p>
              <p>Bought: {collection.boughtNew ? "New" : "Used"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
