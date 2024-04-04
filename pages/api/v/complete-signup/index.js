import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {email, code}= req.body
            const [rows]= await connection.execute("SELECT * FROM verify_code WHERE email= ? AND code= ?", [email, code])
            if(rows.length > 0) {
                return res.status(200).json({complete: true})
            }
            else {
                return res.status(200).json({complete: false})
            }
            
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}

export default handler