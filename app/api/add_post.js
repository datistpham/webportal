import axios from "axios"

const add_post= async (title, image, content)=> {
    const res= await axios({
        url: "/api/v3/post",
        method: "post",
        data: {
            title, image, content
        }
    })
    const result= await res.data
    return result
}

export default add_post