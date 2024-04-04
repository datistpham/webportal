import axios from "axios"

const get_attendance_detail_student= async (class_id, student_id, course_id)=> {
    const res= await axios({
        url: "/api/v2/teacher/attendance/student",
        method: "get",
        params: {
            class_id, student_id, course_id
        }
    })
    const result= await res.data
    return result
}   

export default get_attendance_detail_student