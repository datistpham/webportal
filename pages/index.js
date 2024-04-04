import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Login from './login/admin'
import HomePage from '@/app/views/home/home'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <>
      <Head>
          <title>Portal</title>
      </Head>
      <main style={{color: "#000", width: "100%"}} className={"main"}>
        <HomePage />
      </main>
    </>
  )
}
