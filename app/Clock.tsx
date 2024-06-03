'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const initialTime = 15 * 60; 

  const getInitialTime = () => {
    const savedTime = localStorage.getItem('remainingTime');
    return savedTime !== null ? parseInt(savedTime, 10) : initialTime;
  };

  const [time, setTime] = useState(getInitialTime());
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timerID);

          
          
          params.set('stop', 'true');
          setStop(true);
          replace(`${pathname}?${params.toString()}`);

          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem('remainingTime', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

  return (
    <><div className="ml-[20px] text-[27px] p-[3px] border-2 border-black rounded-[6px] bg-white">
      {formattedTime}
    </div>
    {stop && <button className="absolute left-[45%] top-[35%] " onClick={() => {
      setTime(15 * 60);
      params.set('stop', 'false');
      params.set('page', '0');
      
    replace(`${pathname}?${params.toString()}`);
    }}>начать снова</button>}</>
  );
}
