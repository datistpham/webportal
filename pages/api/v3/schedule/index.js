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
    if(req.method=== "POST") {
        try {
            const {classId, daySchedule, shift, start, end, courseId}= req.body
            const [rows]= await connection.execute("INSERT INTO schedule(course_id, class_id, day_schedule, shift, time_start, time_end) VALUES(?, ?, ?, ?, ?, ?)", [courseId, classId, daySchedule, shift, start, end])
            return res.status(200).json({data: rows, success: true, ok: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}


export default handler