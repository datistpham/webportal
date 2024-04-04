import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {teacher_id }= req.query
            const [rows]= await connection.execute("SELECT *, teacher_teach_subject.teacher_teach_subject_id AS id FROM teacher_teach_subject INNER JOIN course ON course.course_id = teacher_teach_subject.course_id INNER JOIN class ON class.class_id = teacher_teach_subject.class_id WHERE teacher_teach_subject.teacher_id= ?", [teacher_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}   

export default handler