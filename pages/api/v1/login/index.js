import connection from "../../connect"

const login= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const [rows]= await connection.execute("SELECT account, role, account_id FROM account WHERE account= ? AND password= ?", [req.body.account, req.body.password])
            if(rows.length <= 0 ) {
                return res.status(200).json({exist: false, message: "Account or password is not correct"})
            }
            else {
                if(rows[0].role=== 1) {
                    const [rows1]= await connection.execute("SELECT student_id FROM student WHERE account_id= ?", [rows[0]?.account_id])
                    if(rows.length > 0) {
                        return res.status(200).json({exist: true, login: true, role: 1, uid: rows1[0].student_id, sid: rows[0].account_id})
                    }
                    return res.status(200).json({exist: false, login: false, role: 1, sid: rows[0].account_id})
                }
                if(rows[0].role=== 2) {
                    const [rows1]= await connection.execute("SELECT teacher_id FROM teacher WHERE account_id= ?", [rows[0]?.account_id])
                    console.log(rows1)
                    if(rows1.length > 0) {
                        return res.status(200).json({exist: true, login: true, role: 2, uid: rows1[0].teacher_id, sid: rows[0]?.account_id})
                    }
                    return res.status(200).json({exist: true, login: true, role: 2, sid: rows[0].account_id})
                }
                if(rows[0].role=== 3) {
                    const [rows1]= await connection.execute("SELECT id FROM admin WHERE account= ?", [rows[0]?.account])
                    if(rows1.length > 0) {
                        return res.status(200).json({exist: true, login: true, role: 3, uid: rows1[0].id, sid: rows[0]?.account_id})
                    }
                    return res.status(200).json({exist: true, login: true, role: 3, sid: rows[0].account_id})
                }
                return res.status(200).json({exist: true, login: true, role: rows[0].role, sid: rows[0]?.account_id})
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export default login