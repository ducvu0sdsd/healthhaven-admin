import { globalContext } from '@/context/globalContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const Logo = () => {
    const { globalData } = useContext(globalContext)
    return (
        <Link href={"/"}><div className='text-[20px] font-bold'>HealthHaven Admin {globalData.user?.fullName}</div></Link>
    )
}

export default Logo