import axios from "axios"

const update_score_student= async (data)=> {
    const res= await axios({
        url: "/api/v2/homeroom/score",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_score_student