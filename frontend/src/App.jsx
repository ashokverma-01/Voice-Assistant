import React, { useState } from "react";
import VoiceRecorder from "./components/VoiceRecorder";
import Chat from "./components/Chat";

export default function App() {
  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text: "Hello! I'm your voice assistant. Press the mic and talk.",
    },
  ]);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Voice AI Assistant
          </h1>

          <p className="text-sm bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            Speak to the mic — assistant will reply with voice + text.
          </p>
        </header>
        <main
          className="bg-gradient-to-br from-red-50 via-white to-blue-50 
             rounded-2xl shadow-lg shadow-red-200/40 p-4 flex flex-col gap-4 border border-red-200/40"
        >
          <Chat messages={messages} />
          <VoiceRecorder
            onResponse={(transcript, assistant) => {
              if (transcript) addMessage({ from: "user", text: transcript });
              if (assistant) addMessage({ from: "assistant", text: assistant });
            }}
          />
        </main>

        <footer className="text-xs mt-4 text-center">
          <p className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Tips: Hold{" "}
            <span className="font-medium underline">Hold to Record</span>{" "}
            button, or use Live SpeechRecognition.
          </p>
        </footer>
      </div>
    </div>
  );
}
