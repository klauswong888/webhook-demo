'use client'

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { z } from "zod";
import sendToWebhook from "@/app/utils/webhook";

const schema = z.object({
  name: z.string().max(20, "Name must be at most 20 characters").optional(),
  message: z.string().min(1, "Message is required"),
});

function getLocalUser() {
  if (typeof window === "undefined") return { uid: null, username: null };
  return {
    uid: localStorage.getItem("uid"),
    username: localStorage.getItem("username"),
  };
}

function setLocalUser(uid: string, username: string) {
  localStorage.setItem("uid", uid);
  localStorage.setItem("username", username);
}

export default function BoardModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (name: string, message: string) => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [localUser, setLocalUserState] = useState(getLocalUser());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalUserState(getLocalUser());
    setError(null);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    let uid = localUser.uid;
    let username = localUser.username;
    // zod 
    const result = schema.safeParse({
      name: !uid ? name : undefined,
      message,
    });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    if (!uid || !username) {
      uid = crypto.randomUUID();
      username = name;
      setLocalUser(uid, username);
      setLocalUserState({ uid, username });
    }
    const payload = {
      uid,
      username,
      message,
      createdAt: new Date().toISOString(), 
    };

    await Promise.all([
      addDoc(collection(db, "messages"), {
        ...payload,
        createdAt: serverTimestamp(),
      }),
      sendToWebhook(payload),
    ]);
    onSubmit(username, message);
    setMessage("");
    if (!localUser.uid) setName("");
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">Add Message</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!localUser.uid && (
            <input
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={20}
              required
            />
          )}
          <textarea
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Your Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
} 