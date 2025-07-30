import { BookOpen, Globe2, GraduationCap, Home } from "lucide-react";
import React from "react";

export const Services = () => {
  const services = [
    {
      icon: <GraduationCap className="text-4xl text-blue-600 mb-4" />,
      title: "Skilled Instructors",
      description:
        "“Learn from the best-skilled instructors who make every lesson count”",
      delay: "0.1s",
    },
    {
      icon: <Globe2 className="text-4xl text-blue-600 mb-4" />,
      title: "Online Classes",
      description: "“Your classroom, your schedule—learn anytime, anywhere”",
      delay: "0.3s",
    },
    {
      icon: <Home className="text-4xl text-blue-600 mb-4" />,
      title: "Home Projects",
      description: "“Learning by doing—at home and beyond”",
      delay: "0.5s",
    },
    {
      icon: <BookOpen className="text-4xl text-blue-600 mb-4" />,
      title: "Book Library",
      description: "“A world of knowledge at your fingertips”",
      delay: "0.7s",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="text-center bg-white rounded-lg shadow-md pt-6 pb-8 px-4 hover:shadow-xl hover:bg-green-400 transition duration-300 ease-in-out"
              style={{ animationDelay: service.delay }}
            >
              <div className="flex flex-col items-center">
                {service.icon}
                <h5 className="text-xl font-semibold mb-2">{service.title}</h5>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
