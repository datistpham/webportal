import axios from "axios"

const get_scrore_homeroom= async (class_id)=> {
    const res= await axios({
        url: "/api/v2/homeroom/score",
        method: "get",
        params: {
            class_id
        }
    })
    const result= await res.data
    return result
}

export default get_scrore_homeroom