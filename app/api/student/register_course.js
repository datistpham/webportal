import axios from "axios"

const register_course= async (data) => {
    const res= await axios({
        url: "/api/v1/student/register/course",
        method: "POST",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default register_course