import axios from "axios"

const add_course= async (data)=> {
    const res= await axios({
        url: "/api/v3/course",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default add_course