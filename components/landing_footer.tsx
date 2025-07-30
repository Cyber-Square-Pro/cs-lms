import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 mt-10">
    <div className="container mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Condition', 'FAQs & Help'].map((link, i) => (
              <li key={i}>
                <Link
                  href="#"
                  className="hover:text-white transition duration-200 inline-block"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
          <p className="mb-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            123 Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fas fa-phone-alt mr-2"></i>
            +012 345 67890
          </p>
          <p className="mb-2">
            <i className="fas fa-envelope mr-2"></i>
            info@example.com
          </p>
          <div className="flex gap-3 mt-4">
            {['twitter', 'facebook-f', 'youtube', 'linkedin-in'].map((platform, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-gray-300 text-white rounded-full hover:bg-blue-600 hover:border-blue-600 transition"
              >
                <i className={`fab fa-${platform}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Gallery</h4>
          <div className="grid grid-cols-3 gap-2">
            {['course-1.jpg', 'course-2.jpg', 'course-3.jpg', 'course-2.jpg', 'course-3.jpg', 'course-1.jpg'].map((img, i) => (
              <div key={i}>
                <Image
                  src={`/img/${img}`}
                  alt={`Course ${i}`}
                  width={100}
                  height={100}
                  className="rounded bg-white p-1 object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Newsletter</h4>
          <p className="mb-4">Stay Connected, Stay Ahead—Your Learning Updates Are Here!</p>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full py-3 px-4 rounded pr-32 text-black"
              placeholder="Your email"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="bg-gray-800 py-4 border-t border-gray-700 text-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
        <div>
          &copy; <Link href="#" className="border-b border-dashed hover:text-white">Your Site Name</Link>, All Rights Reserved.
          Designed by <a href="https://htmlcodex.com" className="border-b border-dashed hover:text-white">HTML Codex</a>
        </div>
        <div className="space-x-4">
          <Link href="#" className="hover:text-white">Home</Link>
          <Link href="#" className="hover:text-white">Cookies</Link>
          <Link href="#" className="hover:text-white">Help</Link>
          <Link href="#" className="hover:text-white">FAQs</Link>
        </div>
      </div>
    </div>
  </footer>
  )
}
 