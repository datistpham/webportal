import axios from "axios"

const get_list_application= async (student_id, class_id)=> {
    const res= await axios({
        url: "/api/v1/student/application",
        method: "get",
        params: {
            student_id, class_id
        }
    })
    const result= await res.data
    return result
}

export default get_list_application