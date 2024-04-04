import axios from "axios"

const get_list_class= async ()=> {
    const res= await axios({
        url: "/api/v3/class",
        method: "get",
    })
    const result= await res.data
    return result
}

export default get_list_class