import axios from "axios"

const update_teacher= async (data)=> {
    const res= await axios({
        url: "/api/v3/teacher",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_teacher