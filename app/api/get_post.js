import axios from "axios"

const get_post= async ()=> {
    const res= await axios({
        url: "/api/v3/post",
        method: "get",
    })
    const result= await res.data
    return result
}

export default get_post