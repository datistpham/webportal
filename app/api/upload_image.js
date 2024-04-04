import axios from "axios"

const upload_image= async (img)=> {
    const res= await axios({
        url: "/api/v1/upload-image",
        method: "post",
        data: {
            image: img
        }
    })
    const result= await res.data
    return result
}

export default upload_image