import axios from "axios"

const get_manage_absense_for_teacher= async (class_id)=> { 
    const res= await axios({
        url: "/api/v2/teacher/manage-absense",
        method: "get",
        params: {
            class_id
        }
    })
    const result= await res.data
    return result

}

export default get_manage_absense_for_teacher