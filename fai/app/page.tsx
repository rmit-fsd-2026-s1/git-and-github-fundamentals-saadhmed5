"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I am UniAssist AI. I can help with study planning, university policies, support services, and wellbeing referrals.",
    },
  ]);

  const [userInput, setUserInput] = useState("");

  const sendMessage = () => {
    if (userInput.trim() === "") return;

    const userMessage = {
      type: "user",
      text: userInput,
    };

    let botReply = "";

    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("assignment")) {
      botReply =
        "It looks like you have upcoming assignment pressure. Suggested plan: list your due dates, prioritise the closest deadline, break each task into research, drafting, editing, and submission, and use short study blocks around your work schedule. If needed, contact academic support early.";
    } else if (
      lowerInput.includes("stress") ||
      lowerInput.includes("overwhelmed") ||
      lowerInput.includes("anxious")
    ) {
      botReply =
        "It sounds like you may be feeling overwhelmed. UniAssist AI is not a counsellor, but it can guide you to university wellbeing support services. You may also contact your course coordinator if deadlines are becoming difficult.";
    } else if (lowerInput.includes("deadline")) {
      botReply =
        "If you are concerned about a deadline, check your university extension or special consideration policy and contact your course coordinator as early as possible.";
    } else if (
      lowerInput.includes("policy") ||
      lowerInput.includes("special consideration") ||
      lowerInput.includes("extension")
    ) {
      botReply =
        "For university policies, UniAssist AI would retrieve information from verified university sources such as official policy pages, course guides, and academic calendars.";
    } else {
      botReply =
        "I can help with study planning, assignment guidance, university policies, support services, and wellbeing referrals. Please describe what you need help with.";
    }

    const botMessage = {
      type: "bot",
      text: botReply,
    };

    setMessages([...messages, userMessage, botMessage]);
    setUserInput("");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-blue-900 text-white text-center py-10 px-4 shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold">UniAssist AI</h1>
        <p className="mt-3 text-lg">
          Student Support Assistant for Higher Education
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
            Student Dashboard
          </h2>

          <p className="mb-6">
            Welcome, student. How can UniAssist AI help you today?
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-lg font-semibold">
              Ask UniAssist AI
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-lg font-semibold">
              Study Planner
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-lg font-semibold">
              Wellbeing Support
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-lg font-semibold">
              University Policies
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-lg font-semibold">
              Support Services
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
            UniAssist AI Chat
          </h2>

          <div className="h-80 overflow-y-auto bg-slate-100 rounded-xl p-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 p-3 rounded-lg leading-relaxed ${
                  message.type === "user"
                    ? "bg-blue-200 text-right ml-10"
                    : "bg-white border-l-4 border-blue-900 mr-10"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3"
              type="text"
              placeholder="Example: I have three assignments due next week..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-800"
            >
              Send
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">
          Prototype Purpose
        </h2>

        <p className="leading-relaxed">
          This mock-up demonstrates how students could interact with UniAssist AI
          to receive study planning, academic guidance, university policy help,
          and wellbeing support referrals through one simple platform.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            1. Ask a Question
          </h3>
          <p>
            Students type their academic, wellbeing, or university support
            question into the chat.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            2. AI Finds Support
          </h3>
          <p>
            UniAssist AI provides guidance based on study needs, university
            policies, and support pathways.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            3. Human Referral
          </h3>
          <p>
            Sensitive issues such as wellbeing concerns are referred to official
            university support services.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/uniassist-new.png"
            alt="Student using UniAssist AI support assistant"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-blue-950/35 flex items-end">
            <div className="text-white p-8 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                AI Support for Every Student
              </h2>
              <p className="text-lg leading-relaxed">
                UniAssist AI helps students access study planning, academic
                support, university policies, and wellbeing guidance in one
                simple and accessible platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}