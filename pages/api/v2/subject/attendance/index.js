import connection from "@/pages/api/connect"
import moment from "moment"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {class_id, course_id }= req.query
            const [rows] = await connection.execute("SELECT attendance.*, student.first_name, student.middle_name, student.last_name FROM attendance LEFT JOIN student ON student.student_id = attendance.student_id WHERE attendance.class_id= ? AND attendance.course_id= ? AND time_attendance= ?", [class_id, course_id, moment(new Date()).format("DD-MM-YYYY")])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler