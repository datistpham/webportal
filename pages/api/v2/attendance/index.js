import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const { class_id }= req.query
            const [rows]= await connection.execute("SELECT attendance.*, student.*, class.*, student.student_id AS id FROM attendance RIGHT JOIN class ON class.class_id = attendance.class_id INNER JOIN student ON student.class_id = class.class_id WHERE class.class_id = ?", [class_id])
            return res.status(200).json(rows)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler