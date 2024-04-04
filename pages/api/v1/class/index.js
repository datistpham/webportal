import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {class_id }= req.query
            const [rows]= await connection.execute("SELECT *, student_id AS id FROM student WHERE class_id= ?", [class_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}   

export default handler