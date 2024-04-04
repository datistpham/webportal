import axios from "axios"

const attendance_mark= async (data)=> {
    const res= await axios({
        url: "/api/v2/attendance/mark",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default attendance_mark