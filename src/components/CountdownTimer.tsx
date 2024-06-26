import { useCountdown } from "@/hooks/useCountDown";
import React from "react";

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  // if (hours + minutes + seconds <= 0) {
  //   return;
  // }

  return (
    <div className="flex gap-[0.5rem]">
      <div className="text-white bg-black  items-center justify-center w-[6rem] h-[3rem] text-[1.6rem] rounded-[0.5rem] hidden">
        {days}
      </div>
      <div className="text-white bg-black flex items-center justify-center w-[6rem] h-[3rem] text-[1.6rem] rounded-[0.5rem]">
        {hours}
      </div>
      <div className="text-white bg-black flex items-center justify-center w-[6rem] h-[3rem] text-[1.6rem] rounded-[0.5rem]">
        {minutes}
      </div>
      <div className="text-white bg-black flex items-center justify-center w-[6rem] h-[3rem] text-[1.6rem] rounded-[0.5rem]">
        {seconds}
      </div>
    </div>
  );
};

export default CountdownTimer;
