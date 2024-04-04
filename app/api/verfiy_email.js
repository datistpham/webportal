import axios from "axios"

const verify_email= async (email)=> {
    const res= await axios({
        url: "/api/v/confirm_email",
        method: "post",
        data: {
            email
        }
    })
    const result= await res.data
    return result
}

export default verify_email