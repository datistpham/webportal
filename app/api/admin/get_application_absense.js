import axios from "axios"

const get_application_absense= async ()=> {
    const res= await axios({
        url: "/api/v3/application-absense",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_application_absense