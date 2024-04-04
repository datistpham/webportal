import connection from "../../connect";
import sendEmail from "../../utils/mail"

export const generateCode = () => {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return code;
  };

const handler= async  (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {email}= req.body
            const code= generateCode()
            const result= await sendEmail(email, code)
            const [rows]= await connection.execute("INSERT INTO verify_code(email, code ) VALUES(?, ?)", [email, code])
            return res.status(200).json({send: true})
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }   
}

export default handler