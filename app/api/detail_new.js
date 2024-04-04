import axios from "axios"

const detail_new= async (new_id)=> {
    const res= await axios({
        url: "/api/v1/news/"+ new_id,
        method: "get",
    })
    const result= await res.data
    return result
}

export default detail_new