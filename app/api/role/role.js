import axios from "axios"
import Cookies from "js-cookie"

const role= async ()=> {
    const res= await axios({
        url: "/api/v1/authentication",
        method: "post",
        data: {
            uid: Cookies.get("uid") || "",
            sid: Cookies.get("sid") || "",
            role: Cookies.get("role") || ""
        }
    })
    const result= await res.data
    return result
}

export default role