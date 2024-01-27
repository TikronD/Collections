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

  // Does not make sense for this specific topic, but wanted to leave it in for completion reasons
  // if (searchParams.sort === "reverse") {
  //   collection.rows.reverse();
  // }

  return (
    <div>
      <h2>My Board Games</h2>
      <nav>
        {/* <Link href="/?sort=reverse">Reverse</Link> */}
        <Link href="/">Cronologically</Link>
        <Link href={`/?sort=name`}>Sort A-Z</Link>
        <Link href={`/?sort=pricedec`}>Price High-Low</Link>
        <Link href={`/?sort=priceasc`}>Price Low-High</Link>
      </nav>
      <hr />
      {collection.rows.map((collection) => {
        return (
          <div key={collection.game} className="post">
            <Link href={`/message/${collection.id}`}>
              <nav>
                <h2>{collection.game}</h2>
              </nav>
            </Link>
            <div className="detail">
              <h3>Price: £{collection.price}</h3>
              <h3>Extras: {collection.extras}</h3>
              <h3>Bought: {collection.boughtnew ? "New" : "Used"}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
