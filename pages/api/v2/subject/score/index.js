import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {class_id, course_id }= req.query
            const [rows]= await connection.execute("SELECT *, score.score_id AS id FROM score INNER JOIN course ON course.course_id = score.course_id INNER JOIN class ON class.class_id = score.class_id LEFT JOIN student ON student.student_id = score.student_id WHERE class.class_id= ? AND course.course_id= ?", [class_id, course_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method === "POST" ) {
        try {
            const {student_id, course_id, class_id,  score_1, score_2, mid_term, final_term }= req.body
            const [rows]= await connection.execute("INSERT INTO score(student_id, course_id, class_id, score_1, score_2, mid_term, final_term) VALUES(?, ?, ?, ?, ?, ?, ?)", [student_id, course_id, class_id,  score_1, score_2, mid_term, final_term ])
            return res.status(200).json({ok: true})
        } catch (error) {
            return res.status(500).json(error)
            
        }
    }
    if(req.method=== "PATCH") {
        try {
            const {score_1, score_2, mid_term, final_term, score_id, course_id, class_id, student_id }= req.body
            const [rows]= await connection.execute("UPDATE score SET score_1= ?, score_2= ?, mid_term= ?, final_term= ? WHERE class_id = ? AND course_id= ? AND student_id= ?", [score_1, score_2, mid_term, final_term, class_id, course_id, student_id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}   

export default handler