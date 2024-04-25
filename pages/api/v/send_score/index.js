import connection from "../../connect"
import { sendMailScore } from "../../utils/mail"
// import sendEmail from "../../utils/mail"
// import { generateCode } from "../../v/confirm_email"

const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {email, score1, score2, score3, score4, midTerm, finalTerm }= req.body
            console.log(req.body)
            sendMailScore(email, score1, score2, score3, score4, midTerm, finalTerm)
            return res.status(200).json({send: true})
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler