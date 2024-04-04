import axios from "axios"

const add_student= async (data)=> {
    const res= await axios({
        url: "/api/v3/student",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default add_student