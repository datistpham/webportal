import React from 'react'
import Cookies from "js-cookie"
import { useRouter } from 'next/router'

const Header = () => {
  const router= useRouter()

  return (
    <div style={{width: "100%", height: 60, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <div style={{fontSize: 48, fontWeight: 600, color: "#2e89ff"}} onClick={()=> router.push("/")}>Portal</div>
      <div onClick={()=> {
        Cookies.remove("uid")
        Cookies.remove("sid")
        Cookies.remove("role")
        window.location.href= window.location.origin
      }} style={{color: "#000", cursor: "pointer"}}>Logout</div>
    </div>
  )
}

export default Header