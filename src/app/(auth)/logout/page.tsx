"use client"
import React, { useEffect } from 'react'
import useAuth from '@/Context/useAuth'
import { useRouter } from 'next/navigation'
import appwriteService from '@/appwrite-service/config'

const page = () => {
    const { setAuthStatus } = useAuth()
    const router = useRouter()
    useEffect(() => {
        async function logout() {
            await appwriteService.logout()
        }
        logout();
        setAuthStatus(false)
        router.replace('/')
    },[])

  return (
    <div className='h-screen flex justify-center items-center text-3xl font-bold'>logging out....</div>
  )
}

export default page