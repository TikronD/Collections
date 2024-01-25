"use client";
import { useFormStatus } from "react-dom";

export default function SaveGameButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your boardgame to your collection" : "Save Boardgame"}
    </button>
  );
}
