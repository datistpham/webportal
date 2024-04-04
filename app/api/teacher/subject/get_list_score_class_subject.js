import axios from "axios"

const get_list_score_class_subject= async (class_id, course_id)=> {
    const res= await axios({
        url: "/api/v2/subject/score",
        method: "get",
        params: {
            class_id, course_id
        }
    })
    const result= await res.data
    return result
}

export default get_list_score_class_subject