import axios from "axios"

const get_list_request_signup= async ()=> {
    const res= await axios({
        url: "/api/v3/request-signup",
        method: "get",
        
    })
    const result= await res.data
    return result
}

export default get_list_request_signup