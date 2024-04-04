import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        const {teacher_id }= req.query
        const [rows]= await connection.execute("SELECT *, student_id AS id, class.class_name FROM student INNER JOIN teacher_homeroom ON student.class_id = teacher_homeroom.class_id INNER JOIN class ON class.class_id = teacher_homeroom.class_id WHERE teacher_homeroom.teacher_id= ?", [teacher_id])
        return res.status(200).json(rows)
    }

}

export default handler