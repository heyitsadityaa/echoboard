"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen text-2xl font-semibold gap-y-2'>
            <span className="">
                Page Not Found!!
            </span>

            <Button className='bg-lime-400 hover:bg-lime-500' size="lg">
                <Link href="/">
                    Go to Home
                </Link>
            </Button>
        </div>
    )
}

export default NotFound
