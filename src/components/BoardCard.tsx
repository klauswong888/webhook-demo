import { Timestamp } from "firebase/firestore";

export default function BoardCard({ name, message, createdAt }: { name: string; message: string; createdAt?: Timestamp | Date | string }) {
  let timeStr = "";
  if (createdAt) {
    let date: Date;
    if (typeof createdAt === "string") {
      date = new Date(createdAt);
    } else if (createdAt instanceof Date) {
      date = createdAt;
    } else if (createdAt && typeof (createdAt as Timestamp).toDate === "function") {
      date = (createdAt as Timestamp).toDate();
    } else {
      date = new Date();
    }
    timeStr = date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: "2-digit", minute: "2-digit" });
  }
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-200">
      <div className="font-bold text-blue-600 flex items-center gap-2">
        {name}
        {timeStr && (
          <span className="text-xs text-gray-400 font-normal">{timeStr}</span>
        )}
      </div>
      <div className="text-gray-800 break-words">{message}</div>
    </div>
  );
}