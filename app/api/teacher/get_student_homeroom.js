import axios from "axios"

const get_student_homeroom= async (teacher_id )=> {
    const res= await axios({
        url: "/api/v2/homeroom",
        method: "get",
        params: {
            teacher_id
        }
    })
    const result= await res.data
    return result
}

export default get_student_homeroom