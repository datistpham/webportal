import axios from "axios"

const update_profile_student= async (data)=> {
    const res= await axios({
        url: "/api/v1/student/profile",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_profile_student