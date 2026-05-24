'use client';

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge"

interface RangeProps {
  value: number;
  setValue: (value: number) => void;
  className?: string;
  seperator?: string;
}

export const Range = (props: RangeProps) => {
  const { value, setValue, className, seperator="%" } = props;
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging && sliderRef.current) {
      const rect = (sliderRef.current as any).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newValue = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      setValue(Math.round(newValue));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (value: number) => {
    setValue(Math.round(value));
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={twMerge("w-full flex mt-1 mb-2.5", className)}>
      <div ref={sliderRef} onMouseDown={handleMouseDown}  className="relative flex items-center w-[calc(100%-14px)] ml-[7px] h-[25px]">
        <div className="bn-slider-available-bar w-full">
            <div className={twMerge(`h-full bg-gray-300 dark:bg-gray`)} style={{width: `${value}%`}}></div>
        </div>
        <div className="bn-slider-disabled-bar ml-[100%]"></div>
          <div className={twMerge("group bn-slider-radio-button z-50")} style={{marginLeft: `${value}%`}}>
            <label className="bn-slider-radio-tooltip opacity-0 invisible group-hover:visible group-hover:opacity-100">{Math.round(value)}{seperator}</label>
          </div>
        <div className="bn-slider-stepper ml-[100%]"></div>
        <div onClick={() => handleClick(0)} className="bn-slider-stepper ml-[0%] bn-slider-active"></div>
        <div onClick={() => handleClick(25)} className={twMerge("bn-slider-stepper ml-[25%]", value > 24 && 'bn-slider-active')}></div>
        <div onClick={() => handleClick(50)} className={twMerge("bn-slider-stepper ml-[50%]", value > 49 && 'bn-slider-active')}></div>
        <div onClick={() => handleClick(75)} className={twMerge("bn-slider-stepper ml-[75%]", value > 74 && 'bn-slider-active')}></div>
        <div onClick={() => handleClick(100)} className={twMerge("bn-slider-stepper ml-[100%]", value > 99 && 'bn-slider-active')}></div>

      </div>
    </div>
  )
}