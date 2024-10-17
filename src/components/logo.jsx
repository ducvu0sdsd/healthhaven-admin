import { globalContext } from '@/context/globalContext'
import Link from 'next/link'
import React, { useContext } from 'react'
const Logo = () => {
    const { globalData } = useContext(globalContext)
    return (
        <Link href={"/"}>
          <div className='flex flex-row gap-3'>
            <img src="/logo.png" width={'50px'} /> 
            <span className='text-[20px] font-bold'>Admin </span>
          </div>
        
          <div className='text-[20px] font-bold'>
            
           
            {globalData.user?.fullName}</div>
          </Link>
    )
}

export default Logo