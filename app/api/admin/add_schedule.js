import axios from "axios"

const add_schedule = async (data)=> {
    const res= await axios({
        url: "/api/v3/schedule",
        method: "post",
        data: {
            ...data
        }

    })
    const result= await res.data
    return result
}

export default add_schedule 