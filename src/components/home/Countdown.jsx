import { useEffect, useState } from "react";

export default function Countdown() {
  const target = new Date();
  target.setHours(target.getHours() + 24);

  const calculate = () => {
    const diff = target - new Date();

    return {
      hours: Math.floor(diff / 1000 / 60 / 60),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 mt-8">
      {["hours", "minutes", "seconds"].map((item) => (
        <div key={item} className="bg-white rounded-xl px-5 py-3 shadow">
          <div className="text-3xl font-bold text-rose-600">
            {String(time[item]).padStart(2, "0")}
          </div>

          <div className="text-xs uppercase text-gray-500">{item}</div>
        </div>
      ))}
    </div>
  );
}
