import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            // const {class_id }= req.query
            const [rows]= await connection.execute("SELECT * FROM absense_application INNER JOIN student ON student.student_id = absense_application.student_id INNER JOIN class ON class.class_id = absense_application.class_id INNER JOIN course ON course.course_id = absense_application.course_id WHERE time_absense > 3")
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler