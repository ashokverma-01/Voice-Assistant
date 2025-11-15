import React, { useState, useRef } from "react";
import RobotImage from "../assets/robot.png";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceRecorder = () => {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  const commands = {
    youtube: "https://www.youtube.com",
    google: "https://www.google.com",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    chatgpt: "https://chat.openai.com",
  };

  const startRecording = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => console.log("🎤 Listening...");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setText(transcript);
      console.log("User Said:", transcript);

      handleCommands(transcript);
    };

    recognition.onerror = (event) => {
      console.log("SR ERROR:", event.error);
    };

    recognition.onend = () => console.log("🎤 Stopped listening");
  };

  const handleCommands = (msg) => {
    if (msg.includes("youtube")) {
      window.open(commands.youtube, "_blank");
    } else if (msg.includes("google")) {
      window.open(commands.google, "_blank");
    } else if (msg.includes("instagram")) {
      window.open(commands.instagram, "_blank");
    } else if (msg.includes("facebook")) {
      window.open(commands.facebook, "_blank");
    } else if (msg.includes("chat gpt") || msg.includes("chatgpt")) {
      window.open(commands.chatgpt, "_blank");
    } else {
      alert("Sorry, command not recognized!");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  return (
    <div className="p-6 text-center flex flex-col items-center">
      <div className="mb-4 w-70 h-70 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
        <img
          src={RobotImage}
          alt="Robot image"
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div>
        <button
          onClick={startRecording}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Start
        </button>

        <button
          onClick={stopRecording}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>

      <p className="mt-4 text-lg font-medium">{text}</p>
    </div>
  );
};

export default VoiceRecorder;
