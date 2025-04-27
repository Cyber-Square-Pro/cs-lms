// components/LandingBanner.tsx
'use client'; // if you're using Next.js app router

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LandingBanner = () => {
  return (
    <div className="w-full mb-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="relative"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative">
            <img src="/img/carousel-1.jpg" alt="" className="w-full h-auto" />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(24,29,56,0.7)] flex items-center">
              <div className="container mx-auto px-4">
                <div className="flex justify-start">
                  <div className="max-w-2xl">
                    <h5 className="text-blue-600 uppercase mb-3 text-lg font-semibold animate-slideInDown">
                      Best Online Classroom
                    </h5>
                    <h1 className="text-white text-5xl font-bold mb-4 animate-slideInDown">
                      The Best Online Learning Platform
                    </h1>
                    <p className="text-white text-lg mb-6">
                      “A complete online classroom—manage, teach, and learn from anywhere. Designed for learning hubs, built for success.”
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a href="#" className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition animate-slideInLeft">
                        Read More
                      </a>
                      <a href="#" className="bg-white text-blue-600 py-3 px-6 rounded hover:bg-gray-200 transition animate-slideInRight">
                        Join Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative">
            <img src="/img/carousel-2.jpg" alt="" className="w-full h-auto" />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(24,29,56,0.7)] flex items-center">
              <div className="container mx-auto px-4">
                <div className="flex justify-start align-bottom">
                  <div className="max-w-2xl">
                    <h5 className="text-blue-600 uppercase mb-3 text-lg font-semibold animate-slideInDown">
                      Best Online Classroom
                    </h5>
                    <h1 className="text-white text-5xl font-bold mb-4 animate-slideInDown">
                      Get Educated Online From Your Home
                    </h1>
                    <p className="text-white text-lg mb-6">
                      “Experience quality education from the comfort of your home. Our online learning platform connects students with teachers in real time, making learning easy, interactive, and accessible—anytime, anywhere.”
                    </p>
                    <div className="flex flex-wrap gap-4 ">
                      <a href="#" className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition animate-slideInLeft">
                        Read More
                      </a>
                      <a href="#" className="bg-white text-blue-600 py-3 px-6 rounded hover:bg-gray-200 transition animate-slideInRight">
                        Join Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LandingBanner;
