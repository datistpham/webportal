import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "PATCH") {
        try {
            const {oldPassword, newPassword, student_id }= req.body
            const [rows]= await connection.execute("SELECT password, account.account_id AS account_id FROM account INNER JOIN student ON student.account_id = account.account_id WHERE account.password= ? AND student.student_id= ?", [oldPassword, student_id])
            if(rows.length > 0 ) {
                const [rows1] = await connection.execute("UPDATE account SET password= ? WHERE account.account_id= ? AND password= ?", [newPassword, rows[0]?.account_id, oldPassword])
                return res.status(200).json({update: true})
            }
            return res.status(200).json({update: false})

            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler