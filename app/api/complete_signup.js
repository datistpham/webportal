import axios from "axios"

const complete_singup= async (email, code)=> {
    const res= await axios({
        url: "/api/v/complete-signup",
        method: "post",
        data: {
            code, email
        }
    })
    const result= await res.data
    return result
}

export default complete_singup