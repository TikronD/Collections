import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header>
        <h1>My Collection</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="./addgame">Add Game</Link>
        </nav>
      </header>
    </div>
  );
}
