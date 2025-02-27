import React, { useEffect, useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const cuurentDate = new Date();
    setDate(cuurentDate.toLocaleDateString());
    // setTime(cuurentDate.toLocaleTimeString());

    const interval = setInterval(() => {
      const newDate = new Date();
      setTime(newDate.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl p-4 text-center rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500">
      <b className="text-2xl sm:text-xl font-bold">
        {date} - {time}
      </b>
    </div>
  );
};

export default DateTime;

