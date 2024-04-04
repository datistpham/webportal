import axios from "axios"

const get_student_in_class= async (class_id)=> {
    const res= await axios({
        url: "/api/v1/class",
        method: "get",
        params: {
            class_id
        }
    })
    const result= await res.data
    return result
}

export default get_student_in_class