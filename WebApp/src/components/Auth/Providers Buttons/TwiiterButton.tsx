import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons' 

function TwiiterButton() {
  return (
    <button className='p-4 bg-[#55ACEE] br rounded-lg hover:opacity-70'>
         <FontAwesomeIcon className='w-8 h-8 text-white' icon={faTwitter} />
    </button>
  )
}

export default TwiiterButton