import axios from "axios"

const update_post= async (id, title, image, content)=> {
    const res= await axios({
        url: "/api/v3/post",
        method: "patch",
        data: {
            title, image, content, id
        }
    })
    const result= await res.data
    return result
}

export default update_post