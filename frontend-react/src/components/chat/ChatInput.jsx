import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  function submit() {

    if (!text.trim()) return;

    onSend(text);

    setText("");

  }

  return (

    <div className="flex gap-3">

      <input

        value={text}

        onChange={(e)=>setText(e.target.value)}

        placeholder="Ask CareerPilot AI..."

        className="flex-1 rounded-xl bg-[#111827] p-4 outline-none"

      />

      <button

        onClick={submit}

        className="bg-blue-600 px-6 rounded-xl"

      >

        Send

      </button>

    </div>

  );

}