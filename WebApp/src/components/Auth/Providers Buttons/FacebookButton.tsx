import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons' 
import { ProviderButtonProps } from '../Login'

function FacebookButton({setProvider}:ProviderButtonProps) {
  return (
    <button className='p-4 bg-[#3B5998] br rounded-lg hover:opacity-70' onClick={()=>{setProvider('facebook')}} >
    <FontAwesomeIcon className='w-8 h-8 text-white' icon={faFacebookF} />
</button>
  )
}

export default FacebookButton