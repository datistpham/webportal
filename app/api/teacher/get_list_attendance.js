import axios from "axios"

const get_list_attendance= async(class_id)=> {
    const res= await axios({
        url: "/api/v2/attendance",
        method: "get",
        params: {
            class_id
        }
    })
    const result= await res.data
    return result
}

export default get_list_attendance