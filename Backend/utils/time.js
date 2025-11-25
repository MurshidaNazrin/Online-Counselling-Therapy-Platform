export function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

export function minutesToTime(t) {
   const hh = Math.floor(min/60);
   const mm = min % 60;
   return String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
}

export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;