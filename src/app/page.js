import { clearPreviewData } from "next/dist/server/api-utils";

export default function Home() {
  const collection = [
    { name: "Bitoku", price: "45", extras: "insert", boughtNew: false },
    {
      name: "Villagers",
      price: "50",
      extras: "wooden coins, expansions",
      boughtNew: false,
    },
    { name: "Apiary", price: "45", extras: "none", boughtNew: false },
    { name: "Aquatica", price: "45", extras: "Cold Waters", boughtNew: false },
  ];

  return (
    <div>
      <h2>Board Games</h2>
      {collection.map((collection) => {
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
