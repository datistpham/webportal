import axios from "axios"

const update_profile_teacher= async (data)=> {
    const res= await axios({
        url: "/api/v2/teacher/profile",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_profile_teacher
