import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {uid, role, sid }= req.body
            const [rows]= await connection.execute("SELECT * FROM account WHERE account_id= ? && role= ?", [sid, role])
            if(rows.length > 0) {
                return res.status(200).json({login: true, data: rows[0]})

            }
            return res.status(200).json({login: false})

        } catch (error) {
            return res.status(500).json(error)            
        }
        
    }
}

export default handler