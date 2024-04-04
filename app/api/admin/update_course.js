import axios from "axios"

const update_course= async (data)=> {
    const res= await axios({
        url: "/api/v3/course",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_course