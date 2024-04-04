import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method === "GET") {
        try {
            const {class_id, student_id, course_id }= req.query
            const [rows]= await connection.execute("SELECT * FROM attendance WHERE student_id= ? AND class_id= ? AND course_id= ? AND attendance= 1 ", [student_id, class_id, course_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler