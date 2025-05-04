import React from 'react'

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white shadow flex items-center px-6 z-10">
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-900">
         
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search now"
          className="border border-gray-300 rounded-md px-3 py-1 w-72 focus:outline-none"
        />
      </div>
      <div>
        {/* Right-side content: date selector, avatar, etc. */}
        <span className="text-sm text-gray-600">Today (10 Jan 2021)</span>
      </div>
    </div>
  </header>

  )
}
