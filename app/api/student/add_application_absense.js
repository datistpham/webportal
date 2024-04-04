import axios from "axios"

const add_application_absense= async (content, file_attach, startDate, endDate, student_id, class_id)=> {
    const res= await axios({
        url: "/api/v1/student/post/application",
        method: "post",
        data: {
            content, file_attach, startDate, endDate, student_id, class_id
        }
    })
    const result= await res.data
    return result
}   

export default add_application_absense