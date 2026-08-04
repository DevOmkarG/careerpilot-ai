import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  SendHorizonal,
  Sparkles,
  User,
} from "lucide-react";

export default function AIChat() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
`👋 Welcome to CareerPilot AI

I'm your personal Resume Assistant.

• Resume Review
• ATS Score Improvement
• Missing Skills Analysis
• Interview Preparation
• Career Guidance

How can I help you today?`
    }
  ]);

  async function sendMessage() {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.answer,
        },
      ]);

    } catch {

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Unable to connect to AI.",
        },
      ]);

    }

    setLoading(false);

    setMessage("");

  }

  return (

    <>

      <button

        onClick={() => setOpen(true)}

        className="
        fixed
        bottom-6
        right-6
        z-50
        w-14
        h-14
        rounded-full
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        shadow-2xl
        flex
        items-center
        justify-center
        hover:scale-110
        transition
        "

      >

        <Bot size={26} />

      </button>

      <AnimatePresence>

        {

          open && (

            <motion.div

              initial={{
                opacity: 0,
                y: 40,
                scale: .9,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: 40,
                scale: .9,
              }}

              transition={{
                duration: .25,
              }}

              className="
              fixed
              bottom-24
              right-6
              w-[370px]
              h-[560px]
              rounded-[28px]
              bg-[#111827]
              border
              border-white/10
              shadow-2xl
              z-50
              overflow-hidden
              flex
              flex-col
              "

            >

              <div className="px-6 py-5 border-b border-white/10 bg-[#141c2d]">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

                      <Bot size={24} />

                    </div>

                    <div>

                      <h2 className="font-black text-xl">

                        CareerPilot AI

                      </h2>

                      <p className="text-sm text-gray-400">

                        Resume Assistant

                      </p>

                    </div>

                  </div>

                  <button

                    onClick={() => setOpen(false)}

                    className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center"

                  >

                    <X size={20} />

                  </button>

                </div>

              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

                {
  messages.map((msg, index) => (

    <motion.div
      key={index}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .2 }}
    >

      {msg.sender === "ai" ? (

        <div className="flex gap-3 items-start">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">

            <Sparkles size={18} />

          </div>

          <div className="max-w-[85%] rounded-3xl bg-white/5 border border-white/10 px-5 py-4 leading-7 whitespace-pre-line text-gray-200">

            {msg.text}

          </div>

        </div>

      ) : (

        <div className="flex justify-end gap-3">

          <div className="max-w-[80%] rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-4 text-white leading-7">

            {msg.text}

          </div>

          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">

            <User size={18} />

          </div>

        </div>

      )}

    </motion.div>

  ))
}

{
  loading && (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      className="flex gap-3 items-start"

    >

      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

        <Sparkles size={18} />

      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 px-5 py-4 animate-pulse">

        CareerPilot AI is thinking...

      </div>

    </motion.div>

  )
}

</div>

<div className="px-5 pb-4">

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() => setMessage("Review my resume")}
      className="px-3 py-2 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs transition"
    >
      Resume Review
    </button>

    <button
      onClick={() => setMessage("Improve my ATS score")}
      className="px-3 py-2 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs transition"
    >
      ATS Score
    </button>

    <button
      onClick={() => setMessage("Generate interview questions")}
      className="px-3 py-2 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs transition"
    >
      Interview
    </button>

  </div>

</div>

<div className="border-t border-white/10 bg-[#141c2d] p-5">

  <div className="flex gap-3">

    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
      placeholder="Ask CareerPilot AI..."
      className="
        flex-1
        h-14
        rounded-2xl
        bg-[#0B1120]
        border
        border-white/10
        px-5
        text-white
        placeholder:text-gray-500
        outline-none
        focus:border-cyan-500
        transition
      "
    />

    <button
      onClick={sendMessage}
      className="
        w-14
        h-14
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        flex
        items-center
        justify-center
        hover:scale-105
        transition
      "
    >
      <SendHorizonal size={20} />
    </button>

  </div>

</div>

            </motion.div>

          )

        }

      </AnimatePresence>

    </>

  );

}