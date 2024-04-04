import axios from "axios"

const delete_teacher= async (id)=> {
    const res= await axios({
        url: "/api/v3/teacher/"+ id,
        method: "DELETE"
    })
    const result= await res.data
    return result
}

export default delete_teacher