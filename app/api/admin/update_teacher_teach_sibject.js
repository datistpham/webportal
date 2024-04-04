import axios from "axios"

const update_teacher_teach_subject= async (data)=> {
    const res= await axios({
        url: "/api/v3/subject",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_teacher_teach_subject