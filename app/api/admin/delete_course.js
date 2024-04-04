import axios from "axios"

const delete_course= async (id)=> {
    const res= await axios({
        url: "/api/v3/course/"+ id,
        method: "DELETE"
    })
    const result= await res.data
    return result
}

export default delete_course