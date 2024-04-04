import axios from "axios"

const get_list_class_subject= async (teacher_id)=> {
    const res= await axios({
        url: "/api/v2/subject/class",
        method: "get",
        params: {
            teacher_id
        }
    })
    const result= await res.data
    return result
}

export default get_list_class_subject