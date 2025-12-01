export function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

export function minutesToTime(min) {
   const hh = Math.floor(min/60);
   const mm = min % 60;
   return String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
}

export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// PARSE AM/PM 24-hour
export function ampmTo24(timeStr) {
    const regex = /^(\d{1,2}):(\d{2})\s(AM|PM)$/i;
    const match = timeStr.match(regex);
    if (!match) return null;

    let [, hour, minute, period] = match;
    hour = parseInt(hour);
    minute = parseInt(minute);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}



// CONVERT 24-HOUR → AM/PM
export function time24ToAMPM(timeStr) {
    if(!timeRegex.test(timeStr)) return null;

    let [h, m] = timeStr.split(":").map(Number);

    const period = h >= 12 ? "PM" : "AM";

    return `${h}:${String(m).padStart(2, "0")} ${period}`;
}

// smart autoFormat Input
export function autoFormatTime(input) {
    if(!input) return "";

    input = input.trim().toUpperCase();

    // If user types AM/PM
    if(/(AM|PM)$/.test(input)) {
        const cleaned = input.replace(/[^0-9APM]/g, "");
        const match = cleaned.match(/(\d{1,2})(\d{2})?(AM|PM)/);
        if(!match) return input;

        const hour = match[1];
        const minute = match[2] || "00";
        const period = match[3];

        return `${hour}:${minute} ${period}`;
    }

    return input.replace(/[^\d:]/g, "");
}