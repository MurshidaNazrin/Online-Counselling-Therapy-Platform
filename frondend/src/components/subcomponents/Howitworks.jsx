import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, HeartHandshake, Video } from "lucide-react";

function Howitworks() {
  return (
    <section className="w-full bg-gradient-to-b from-sky-50 to-sky-100 py-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-extrabold text-teal-700">
          Your Journey to Well-being in 3 Simple Steps
        </h3>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Follow these simple steps and begin your path to a calmer, happier you 💙
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 md:px-20">
        {/* Step 1 */}
        <motion.div
          className="bg-white shadow-2xl rounded-2xl p-8 text-center w-full md:w-1/3 hover:shadow-sky-300 transition-all duration-500 hover:-translate-y-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <UserCircle2 size={40} className="text-teal-700 mx-auto mb-4" />
          <h5 className="text-2xl text-teal-700 font-bold mb-3">1 - Tell Us About You</h5>
          <p className="text-gray-600 mb-6">
            Complete a brief questionnaire to help us understand your needs and preferences.
          </p>
          <button className="px-5 py-2 border border-teal-500 text-teal-600 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300">
            Meet Our Therapists
          </button>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="bg-white shadow-2xl rounded-2xl p-8 text-center w-full md:w-1/3 hover:shadow-sky-300 transition-all duration-500 hover:-translate-y-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeartHandshake size={40} className="text-teal-700 mx-auto mb-4" />
          <h5 className="text-2xl text-teal-700 font-bold mb-3">2 - Get Matched</h5>
          <p className="text-gray-600 mb-6">
            We’ll connect you with a licensed therapist best suited to support your unique goals.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="bg-white shadow-2xl rounded-2xl p-8 text-center w-full md:w-1/3 hover:shadow-sky-300 transition-all duration-500 hover:-translate-y-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Video size={40} className="text-teal-700 mx-auto mb-4" />
          <h5 className="text-2xl text-teal-700 font-bold mb-3">3 - Start Your Session</h5>
          <p className="text-gray-600 mb-6">
            Begin your personalized therapy journey from the comfort and privacy of your home.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Howitworks;
