import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {student_id, class_id }= req.query
            const [rows]= await connection.execute("SELECT * FROM absense_application WHERE student_id =? AND class_id= ?", [student_id, class_id])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler