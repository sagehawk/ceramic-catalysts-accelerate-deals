
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This program completely transformed my shop. We're now booking premium jobs 3 weeks in advance!",
      author: "Michael R.",
      business: "Precision Auto Detailing"
    },
    {
      quote: "I was skeptical at first, but within 45 days we had 37 new ceramic coating clients. The ROI speaks for itself.",
      author: "Sarah T.",
      business: "Elite Finish Auto Spa"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">What Our Clients Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-slate bg-opacity-50 rounded-xl p-5">
            <p className="text-white mb-4 text-lg italic">"{testimonial.quote}"</p>
            <div className="text-accent-blue font-medium">{testimonial.author}</div>
            <div className="text-gray-400 text-sm">{testimonial.business}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
