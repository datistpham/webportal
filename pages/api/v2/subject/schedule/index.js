import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {class_id, course_id }= req.query
            const [rows] = await connection.execute("SELECT schedule.*, course.course_name, schedule.course_id AS course_id_schedule FROM schedule INNER JOIN course ON course.course_id = schedule.course_id WHERE schedule.class_id= ? AND schedule.course_id= ?", [class_id, course_id])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler