import axios from "axios"

const delete_schedule= async (id)=> {
    const res= await axios({
        url: "/api/v3/schedule/"+ id,
        method: "delete",
    })
    const result= await res.data
    return result
}

export default delete_schedule