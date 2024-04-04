import axios from "axios"

const get_schedule_class_subject= async (class_id, course_id)=> {
    const res= await axios({
        url: "/api/v2/subject/schedule",
        method: "get", 
        params: {
            class_id, course_id
        }
    })
    const result= await res.data
    return result
}

export default get_schedule_class_subject