import React from 'react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "PLIF has transformed how I manage my crypto investments. The automated strategies have consistently outperformed my manual trading.",
      author: "Alex Thompson",
      title: "Crypto Investor",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      quote: "The risk management features are outstanding. I can sleep better knowing my investments are being monitored 24/7.",
      author: "Sarah Chen",
      title: "Portfolio Manager",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      quote: "As a DeFi newcomer, PLIF made it easy to get started with professional-grade investment strategies.",
      author: "Michael Rodriguez",
      title: "Tech Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their investment
            strategy with PLIF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 text-6xl text-blue-200 opacity-50">
                "
              </div>

              <div className="relative">
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
