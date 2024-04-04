import connection from "../../connect"
import sendEmail from "../../utils/mail"
import { generateCode } from "../../v/confirm_email"

const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {email }= req.body
            const [rows]= await connection.execute("SELECT * FROM student WHERE email= ?", [email])
            if(rows.length> 0) {
                const code= generateCode()
                sendEmail(email, code)
                const [rows1]= await connection.execute("DELETE FROM verify_code WHERE email= ?", [email])
                const [rows2]= await connection.execute("INSERT INTO verify_code(email, code) VALUES(?, ?)", [email, code])
                return res.status(200).json({find: true})
            }
            else {
                return res.status(200).json({find: false})
            }
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler