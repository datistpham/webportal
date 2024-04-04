import axios from "axios"

const get_course_register= async (student_id)=> {
    const res= await axios({
        url: "/api/v1/student/course_register",
        method: "GET",
        params: {
            student_id
        }   
    })
    const result= await res.data
    return result
}

export default get_course_register