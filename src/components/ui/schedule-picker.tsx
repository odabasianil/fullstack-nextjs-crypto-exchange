"use client";

import { Icon } from "./icon";
import { twMerge } from "tailwind-merge";
import { memo, useEffect, useState } from "react";

export interface ScheduleProps {
  className: string;
}

export const SchedulePicker = memo((props: ScheduleProps) => {
  const { className } = props;

  const hours = Array.from(
    { length: 24 },
    (_, i) => i.toString().padStart(2, "0") + ":00"
  );
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const daysOfMonth = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  const repeatOptions = ["Daily", "Weekly", "Biweekly", "Monthly"];

  const [selectedRepeat, setSelectedRepeat] = useState("Weekly");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTime, setSelectedTime] = useState("22:00");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);


  const isDayVisible = selectedRepeat !== "Daily";
  const isDayMonthly = selectedRepeat === "Monthly";

  const columnClass = isDayVisible ? "w-[calc(100%/3)]" : "w-[calc(100%/2)]";

  const displayText = `${selectedRepeat}, ${
    selectedRepeat === "Daily"
      ? selectedTime
      : selectedRepeat === "Monthly"
      ? `Day ${selectedDay}, ${selectedTime}`
      : `${selectedDay}, ${selectedTime}`
  } (UTC+3)`;

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  useEffect(() => {
    if (isDropdownOpen) {
      setAnimateOpen(true);
    } else {
      const timer = setTimeout(() => {
        setAnimateOpen(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen]);

  return (
    <>
      <div className="md:mt-6 dark:text-white text-black-200 flex justify-between font-base mb-1">
        Repeat
      </div>
      <div className="relative">
        <div
          className={twMerge(
            "h-[48px] border dark:border-gray-300 border-gray-800 relative w-full inline-block rounded-[4px] dark:hover:border-primary hover:border-primary-200",
            className
          )}
        >
          <div
            className="text-sm h-full flex items-center dark:text-white-100 justify-between pl-3 cursor-pointer"
            onClick={handleToggleDropdown}
          >
            {displayText}
            <Icon
              name="chevron-down"
              size={20}
              className={twMerge("text-gray ml-1 mr-2 min-w-4")}
            />
          </div>
        </div>
        {isDropdownOpen && (
          <div className={twMerge(
            "z-10 md:absolute md:bottom-auto bottom-0 w-full md:max-h-none max-h-[calc(100%-80px)] fixed right-0 top-[auto] ",
            "invisible opacity-0 translate-3d-100 transition-transform-250 md:transition-none",
            animateOpen ? "translate-3d-reset visible opacity-100" : ""
          )}>
            <div className="box-border mt-1.5 min-w-0 w-full filter-drop-shadow dark:bg-black-100 bg-white-800 md:rounded-md rounded-tl-2xl rounded-tr-2xl h-[236px] overflow-hidden md:pt-1 md:pb-1 pt-5 pb-4">
              <div className="flex justify-between h-6 mt-1">
                <div
                  className={twMerge(
                    "dark:text-gray-900 text-xs pl-4 flex items-center border-r dark:border-gray-700 border-gray-800",
                    columnClass
                  )}
                >
                  Frequency
                </div>
                {isDayVisible && (
                  <div
                    className={twMerge(
                      "dark:text-gray-900 text-xs pl-4 flex items-center border-r dark:border-gray-700 border-gray-800",
                      columnClass
                    )}
                  >
                    Day
                  </div>
                )}
                <div
                  className={twMerge(
                    "dark:text-gray-900 text-xs pl-4 flex items-center",
                    columnClass
                  )}
                >
                  Time
                </div>
              </div>
              <div className={twMerge("flex mb-1 h-[calc(100%-24px)]")}>
                {/* Frequency Selection */}
                <div
                  className={twMerge(
                    "border-r dark:border-gray-700 border-gray-800 overflow-auto",
                    isDayVisible ? "w-[calc(100%/3)]" : "w-[calc(100%/2)]"
                  )}
                >
                  {repeatOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => setSelectedRepeat(option)}
                      className={twMerge(
                        "h-[40px] hover:dark:bg-background-300 pl-4 cursor-pointer flex items-center text-sm",
                        selectedRepeat === option
                          ? "text-primary-100 dark:bg-background-300 bg-gray-1000"
                          : ""
                      )}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                {/* Day Selection */}
                {isDayVisible && (
                  <div
                    className={twMerge(
                      "border-r dark:border-gray-700 border-gray-1000 overflow-auto",
                      "w-[calc(100%/3)]"
                    )}
                  >
                    {isDayMonthly
                      ? daysOfMonth.map((day) => (
                          <div
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={twMerge(
                              "h-[40px] hover:dark:bg-background-300 pl-4 cursor-pointer flex items-center text-sm",
                              selectedDay === day
                                ? "text-primary-100 dark:bg-background-300 bg-gray-1000"
                                : ""
                            )}
                          >
                            {day}
                          </div>
                        ))
                      : daysOfWeek.map((day) => (
                          <div
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={twMerge(
                              "h-[40px] hover:dark:bg-background-300 pl-4 cursor-pointer flex items-center text-sm",
                              selectedDay === day
                                ? "text-primary-100 dark:bg-background-300 bg-gray-1000"
                                : ""
                            )}
                          >
                            {day}
                          </div>
                        ))}
                  </div>
                )}

                {/* Time Selection */}
                <div
                  className={twMerge(
                    "border-r dark:border-gray-700 border-gray-800 overflow-auto",
                    isDayVisible ? "w-[calc(100%/3)]" : "w-[calc(100%/2)]"
                  )}
                >
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      onClick={() => setSelectedTime(hour)}
                      className={twMerge(
                        "h-[40px] hover:dark:bg-background-300 pl-4 cursor-pointer flex items-center text-sm",
                        selectedTime === hour
                          ? "text-primary-100 dark:bg-background-300 bg-gray-1000"
                          : ""
                      )}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div onClick={() => setIsDropdownOpen(false)} className="md:hidden block fixed bg-black opacity-50 w-full h-full right-0 top-0 z-9"></div>
      )}
    </>
  );
});
SchedulePicker.displayName = "SchedulePicker";
