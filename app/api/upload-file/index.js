import axios from "axios"

const uploadFile= async (data)=> {
    const res= await axios({
        url: "/api/v/upload_file",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: data
    })
    const result= await res.data
    return result
}   

export default uploadFile