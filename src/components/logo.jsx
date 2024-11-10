import { globalContext } from '@/context/globalContext'
import Link from 'next/link'
import React, { useContext } from 'react'
const Logo = () => {
  const { globalData } = useContext(globalContext)
  return (
    <div className='flex gap-2 w-full items-center'>
      <img src="/logo.png" width={'50px'} height={'50px'} />
      <div className='flex flex-col'>
        <span className='text-[15px] font-semibold'>Quản trị viên </span>
        <div className='text-[14px]'>{globalData.user?.fullName}</div>
      </div>
    </div>
  )
}

export default Logo