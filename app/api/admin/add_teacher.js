import axios from "axios"

const add_teacher= async (data)=> {
    const res= await axios({
        url: "/api/v3/teacher",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default add_teacher