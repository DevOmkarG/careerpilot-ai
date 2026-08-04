import ReactMarkdown from "react-markdown";

export default function ChatMessage({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
            : "bg-white/5 border border-white/10"
        }`}
      >

        {isUser ? text : <ReactMarkdown>{text}</ReactMarkdown>}

      </div>

    </div>
  );
}