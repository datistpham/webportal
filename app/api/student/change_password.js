import axios from "axios"
// import Cookies from "js-cookie"

const change_password= async (oldPassword, newPassword, student_id)=> {
    const res= await axios({
        url: "/api/v1/student/change-password",
        method: "patch",
        data: {
            oldPassword, newPassword, student_id
        }
    })
    const result= await res.data
    return result
}

export default change_password