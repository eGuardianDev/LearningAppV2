import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons' 
import { signIn } from 'next-auth/react'
import { ProviderButtonProps } from '../Login'

function GoogleButton({setProvider}:ProviderButtonProps) {
  return (
    <button className='p-4 bg-[#dd4b39] br rounded-lg hover:opacity-70' onClick={()=>{setProvider('google')}} >
         <FontAwesomeIcon className='w-8 h-8 text-white' icon={faGoogle} />
    </button>
  )
}

export default GoogleButton