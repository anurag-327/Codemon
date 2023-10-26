"use client"
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Questions from '@/components/questions'
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-0">
         <Navbar />
         <Questions />
    </main>
  )
}
