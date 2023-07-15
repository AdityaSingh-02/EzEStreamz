'use client'
import React from 'react'

const error = ({error, reset}:{error:Error, reset:()=> void}) => {
  return (
    <>
      <div className='flex flex-col w-full h-screen bg-gray-700 justify-center items-center text-3xl font-bold'>
        {error.message || "Error"}
        <button className='bg-red-400 px-4 py-2 rounded-md' onClick={reset}>Try Again</button>
      </div>
    </>
  )
}

export default error