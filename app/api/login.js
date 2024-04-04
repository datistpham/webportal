import axios from "axios"

const login= async (account, password)=> {
    const res= await axios({
        url: "/api/v1/login",
        method: "post",
        data: {
            account, password
        }
    })
    const result= await res.data
    return result
}

export default login