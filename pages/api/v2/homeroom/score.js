import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {class_id }= req.query
            const [rows]= await connection.execute("SELECT *, score_id AS id FROM score INNER JOIN class ON class.class_id = score.class_id INNER JOIN student ON student.student_id = score.student_id WHERE score.class_id= ?", [class_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "PATCH") {
        try {
            const {score_1, score_2, mid_term, final_term, score_id }= req.body
            const [rows]= await connection.execute("UPDATE score SET score_1= ?, score_2= ?, mid_term= ?, final_term= ? WHERE score_id= ?", [score_1, score_2, mid_term, final_term, score_id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler