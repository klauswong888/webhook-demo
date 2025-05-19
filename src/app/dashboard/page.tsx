"use client";
import { useState, useEffect } from "react";
import BoardCard from "@/components/BoardCard";
import BoardModal from "@/components/BoardModal";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function DashboardPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("username"));
    }
  }, [modalOpen]);

  // 实时监听 Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* top bar */}
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">Say something</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold ml-4"
            onClick={() => setModalOpen(true)}
            aria-label="Add"
          >
            +
          </button>
        </div>
        {username && (
          <div className="text-gray-700 font-semibold text-lg">{username}</div>
        )}
      </div>
      {/* board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <BoardCard
            key={msg.id}
            name={msg.username}
            message={msg.message}
            createdAt={msg.createdAt}
          />
        ))}
      </div>
      {/* modal */}
      <BoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => setModalOpen(false)}
      />
    </div>
  );
}
