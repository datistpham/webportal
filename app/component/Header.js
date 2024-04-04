import { InputAdornment, TextField } from "@mui/material"
import { useRouter } from "next/router"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';

const Header= ()=> {
    const router= useRouter()
    const [search, setSearch]= useState("")
    return (
        <div style={{width: "100%", height: 80, padding: 10, display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
            <div style={{fontSize: 48, fontWeight: 600, color: "#2e89ff"}}>Portal</div>
            <div style={{display: 'flex', justifyContent: "center", alignItems: "center", gap: 10}}>
            <div>
                <TextField
                    className={"wrap-inp-search"}
                    style={{height: 36}}
                    id="search"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    label="Search post"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                        <InputAdornment style={{cursor: "pointer"}} onClick={()=> {
                            router.push("/search?query_search="+ search)
                        }} position="end">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </div>
                <div style={{color: "#2e89ff", cursor: "pointer", display: 'flex', justifyContent: "center", alignItems: "center"}} onClick={()=> router.push("/login")}>
                    <LoginIcon />
                    <div>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Header