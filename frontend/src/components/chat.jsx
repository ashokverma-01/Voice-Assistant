import React from "react";

export default function Chat({ messages }) {
  return (
    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto p-3 border border-slate-100 rounded-lg">
      {messages.map((m, i) => (
        <div key={i} className="flex justify-center">
          <div
            className={`px-4 py-2 rounded-xl max-w-[80%] text-sm font-medium ${
              m.from === "user"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black shadow"
            }`}
          >
            <div className="whitespace-pre-wrap bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {m.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
