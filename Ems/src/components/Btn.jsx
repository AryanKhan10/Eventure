import React from 'react'

function Btn({event, text, classes}) {
  return (
    <button 
        onClick={()=>{event}}
        className={`${classes} cursor-pointer group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}>
        {text}
    </button>
  )
}

export default Btn
