import axios from "axios"

const update_student= async (data)=> {
    const res= await axios({
        url: "/api/v3/student",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_student