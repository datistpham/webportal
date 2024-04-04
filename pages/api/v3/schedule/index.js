import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const [rows]= await connection.execute("SELECT *, schedule.id AS id FROM schedule INNER JOIN class ON class.class_id = schedule.class_id INNER JOIN course ON course.course_id = schedule.course_id")
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler