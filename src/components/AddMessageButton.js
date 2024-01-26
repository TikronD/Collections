"use client";
import { useFormStatus } from "react-dom";

export default function AddMessageButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Sending message..." : "Message sent."}
    </button>
  );
}
