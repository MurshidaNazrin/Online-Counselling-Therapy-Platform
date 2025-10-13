import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

function Reviews() {
    const reviews = [
        {
            name: "Shiva",
            star: 5,
            comment: "Its a wonderful place for solving problems and learning new Things. The staff is really amazing and proffessional.Dr.Suri is a experienced person and he understand everything easily."
        },
        {
            name: "Aarav",
            star: 5,
            comment: "MindLink helped me manage my anxiety effectively. The counsellors are empathetic and make you feel heard and supported."
        },
        {
            name: "Diya",
            star: 4,
            comment: "The therapy sessions gave me new perspectives about myself. I’m truly grateful for the patient and understanding approach."
        },
        {
            name: "Rahul",
            star: 5,
            comment: "The platform is so easy to use, and the therapists are very kind. I felt comfortable opening up right from the first session."
        },
        {
            name: "Nisha",
            star: 4,
            comment: "Highly recommend! Professional counsellors who genuinely care and help you find inner calm and clarity."
        }
    ]

    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-slide
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [reviews.length, isHovered]);
    return (
        <section className='py-16 bg-gradient-to-b from-white to-teal-50'>
            <div className='max-w-6xl mx-auto px-6 text-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-teal-700 mb-3'>Voice of Transformation</h1>
                <p className='text-gray-600 max-w-2xl mx-auto mb-12'>
                    Hear from individuals who have found healing, clarity, and strength through MindLink’s counselling and therapy services.
                </p>

                {/* cards */}
                <div className='relative w-full h-64 md:h-56'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute w-full bg-white rounded-2xl shadow-md p-6 border border-teal-100"
                        >
                            <div className='flex justify-center text-yellow-400 mb-3'>
                                {Array(reviews[index].star)
                                    .fill()
                                    .map((_, i) => (
                                        <FaStar key={i} size={20} />
                                    ))}
                            </div>

                            <p className='text-gray-700 mb-4 leading-relaxed italic'>
                                "{reviews[index].comment}"
                            </p>

                            <h5 className='text-teal-700 font-semibold text-lg'>
                                — {reviews[index].name}
                            </h5>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* dots */}
                <div className='flex justify-center gap-2 mt-6'>
                    {reviews.map((_, i) => (
                        <button key={i} onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-teal-600 w-5" : "bg-gray-300"}`}></button>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Reviews
