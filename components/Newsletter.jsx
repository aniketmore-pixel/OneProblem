import React from 'react'
import Title from './Title'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center mx-4 my-36">
      <Title
        title="Join Newsletter"
        description="Weekly alerts on the best discounts, trending products, and value buys worth your money."
        visibleButton={false}
      />

      <form
        action="https://getform.io/f/bolqovga"
        method="POST"
        className="flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200"
      >
        {/* Required for Getform */}
        <input type="hidden" name="form-name" value="newsletter" />

        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email address"
          className="flex-1 pl-5 bg-transparent outline-none"
        />

        <button
          type="submit"
          className="font-medium bg-green-500 text-white px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition"
        >
          Get Updates
        </button>
      </form>
    </div>
  )
}

export default Newsletter
