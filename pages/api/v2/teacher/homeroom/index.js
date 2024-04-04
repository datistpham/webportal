import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        const {teacher_id }= req.query
        const [rows]= await connection.execute("SELECT * FROM teacher_homeroom INNER JOIN teacher ON teacher.teacher_id = teacher_homeroom.teacher_id", [teacher_id])
        return res.status(200).json(rows)
    }

}

export default handler