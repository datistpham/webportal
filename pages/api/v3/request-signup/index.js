import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const [rows]= await connection.execute("SELECT * FROM sign_up_student INNER JOIN class ON class.class_id = sign_up_student.class_id")
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

export default handler