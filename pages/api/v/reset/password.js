import connection from "../../connect"
// import sendEmail from "../../utils/mail"
// import { generateCode } from "../../v/confirm_email"

const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {email, password }= req.body
            const [rows]= await connection.execute("UPDATE account INNER JOIN student ON student.account_id = account.account_id SET account.password= ? WHERE student.email= ?", [password, email])
            return res.status(200).json({update: true})
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler