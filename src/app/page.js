import { sql } from "@vercel/postgres";

export default async function Home() {
  const collection = await sql`SELECT * FROM collection`;

  return (
    <div>
      <h2>My Board Games</h2>
      {collection.rows.map((collection) => {
        return (
          <div key={collection.name} className="post">
            <h4>{collection.name}</h4>
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
