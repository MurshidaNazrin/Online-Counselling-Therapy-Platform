import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth
} from "date-fns";

function AvailabilityCalendar({ selectedDate, onSelectDate }) {

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);

  const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goPrev = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goNext = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

      {/* Month Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goPrev}
          className="px-2 py-1 bg-gray-300 text-teal-700 rounded hover:bg-teal-200"
        >
          <FaAngleLeft />
        </button>

        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={goNext}
          className="px-2 py-1 bg-gray-300 text-teal-700 rounded hover:bg-teal-200"
        >
          <FaAngleRight />
        </button>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-700 mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const inMonth = isSameMonth(day, currentMonth);
          const isPast = day < new Date().setHours(0,0,0,0);

          return (
            <button
              key={day.toISOString()}
              onClick={() => inMonth && !isPast && onSelectDate(day)}
              className={`
                h-14 flex items-center justify-center rounded-lg border text-sm
                transition
                ${inMonth ? "bg-teal-100 hover:bg-teal-200 font-semibold text-gray-700" : "bg-gray-100 text-gray-400"}
                ${isSelected ? "bg-teal-500 text-white font-semibold border-teal-700 hover:bg-teal-600" : "border-gray-200"}
                ${(!inMonth || isPast) ? "cursor-not-allowed" : ""}
              `}
              disabled={!inMonth}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AvailabilityCalendar;

