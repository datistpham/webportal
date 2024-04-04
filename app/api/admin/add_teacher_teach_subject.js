import axios from "axios"

const add_teacher_teach_subject= async (data)=> {
    const res= await axios({
        url: "/api/v3/subject",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default add_teacher_teach_subject