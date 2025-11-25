import Appointment from '../models/AppointmentSchema';
import Therapist from '../models/TherapistSchema';


function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

function minutesToTime(min) {
    return String(Math.floor(min / 60)).padStart(2, "0")
        + ":" +
        String(min % 60).padStart(2, "0");
}

export async function generateSLots(req, res) {
    try {
        const { id } = req.params;
        const { date } = req.query;

        if (!date) return res.status(400).json({ message: "Date is required" });

        const therapist = await Therapist.findById(id);
        if (!therapist) return res.status(404).json({ message: "Therapist not found" });

        // Get day name
        const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

        const dayEntry = therapist.availability.find(a => a.day === dayName);
        if (!dayEntry) return res.json({ slots: [] });

        // Slice range into 30-min blocks
        let allSlots = [];

        dayEntry.slots.forEach(slot => {
            let start = timeToMinutes(slot.start);
            let end = timeToMinutes(slot.end);

            for (let t = start; t < end; t += 30) {
                allSlots.push(minutesToTime(t));
            }
        });


        // fetch booked slots
        const bookedAppointments = await Appointment.find({ therapistId: id, date, status: "booked", });
        const bookedTimes = bookedAppointments.map(a => a.time);

        // remove booked slots
        const finalSlots = allSlots.filter(s => !bookedTimes.includes(s));
        res.json({ slots: finalSlots });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}