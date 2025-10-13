import React from 'react'

function Courses() {
    const services = [
        {
            title: "Individual Counselling",
            image: "individual counselling.jpg",
            description: "Personalized one-on-one sessions to help you explore emotions, overcome challenges, and build resilience.",
        },
        {
            title: "Couple Counselling",
            image: "couple counselling.jpg",
            description: "Strengthen your relationship with guided communication and emotional understanding.",
        },
        {
            title: "Family Counselling",
            image: "family counselling.jpg",
            description: "Improve family dynamics and nurture healthy relationships in a supportive environment.",
        },
        {
            title: "Psychiatric Consultation",
            image: "psichiatric consultation.jpg",
            description: "Expert psychiatric evaluations to diagnose and manage mental health conditions through personalized treatment plans, including medication and therapeutic guidance to support long-term well-being.",
        },
        // {
        //     title: "Employees Assistance Program",
        //     image: "",
        //     description: "",
        // },
        {
            title: "Teen Therapy",
            image: "TeenTherapy.jpg",
            description: "A safe and understanding space for teenagers to navigate academic pressure, emotional struggles, peer issues, and identity challenges, empowering them to build confidence and emotional resilience.",
        },
        {
            title: "Kids Therapy",
            image: "kids Therapy.jpg",
            description: "Compassionate support designed for children to express feelings, manage behavior, and improve communication through playful, age-appropriate therapeutic techniques.",
        },
    ]
    return (
        <section className='py-16 bg-gradient-to-b from-white to-teal-50'>
            <div className='max-w-6xl mx-auto px-4 text-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-teal-700 mb-3'>
                    Your Space for Inner Peace
                </h1>
                <p className='text-gray-600 max-w-2xl mx-auto mb-12'>
                    MindLink offers you affordable, confidential, and solution-oriented online counselling & therapy with certified professionals.
                </p>

                {/* cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {services.map((service, index) => (
                        <div key={index}
                            className='group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500 cursor-pointer'>
                            <img src={service.image} alt={service.title}
                                className='h-56 w-full object-cover transition duration-500 group-hover:opacity-70' />

                            {/* title+button */}
                            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center transition-all duration-500">
                                <h6 className="text-lg font-semibold text-teal-700 bg-white/80 px-3 py-1 rounded-md shadow-sm">
                                    {service.title}</h6>
                                <button className="mt-3 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300">Book Now</button>
                            </div>

                            {/* Hidden description */}

                            <div className="absolute inset-0 bg-gradient-to-b from-teal-100/90 to-white/95 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 translate-y-10 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-700 ease-out p-6 text-center">
                                <p className='text-gray-700 text-sm mb-5 leading-relaxed'>{service.description}</p>
                                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Courses




