import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const [rows]= await connection.execute("SELECT *, teacher_teach_subject_id AS id FROM teacher_teach_subject INNER JOIN teacher ON teacher.teacher_id = teacher_teach_subject.teacher_id INNER JOIN course ON course.course_id = teacher_teach_subject.course_id INNER JOIN class ON class.class_id = teacher_teach_subject.class_id")
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "POST") {
        try {
            const {teacherId, classId, courseId}= req.body
            const [rows]= await connection.execute("SELECT * FROM teacher_teach_subject WHERE teacher_id= ? AND class_id= ? AND course_id= ?", [teacherId, classId, courseId])
            if(rows.length > 0) {
                return res.status(200).json({exist: true, add: false})
            }
            else {
                const [rows]= await connection.execute("INSERT INTO teacher_teach_subject(teacher_id, course_id, class_id) VALUES(?, ?, ?)", [teacherId, courseId, classId])
                return res.status(200).json({exist: false, add: true})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "PATCH") {
        try {
            const {teacherId, classId, courseId, id}= req.body
            const [rows]= await connection.execute("UPDATE teacher_teach_subject SET teacher_id= ?, course_id= ?, class_id= ? WHERE teacher_teach_subject_id= ?", [teacherId, courseId, classId, id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "DELETE") {
        console.log(req.query)
    }
}

export default handler