import axios from "axios"

const delete_teacher_teach_subject= async (id)=> {
    const res= await axios({
        url: "/api/v3/subject/"+ id,
        method: "delete",
    })
    const result= await res.data
    return result
}

export default delete_teacher_teach_subject