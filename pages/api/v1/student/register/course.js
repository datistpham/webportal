import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        
    }
    if(req.method=== "POST") {
        try {
            const {student_id, course_id }= req.body
         //    const [rows]= await connection.addListener
             const [rows]= await connection.execute("SELECT * FROM student_learning_course WHERE student_id= ? AND course_id= ?", [student_id, course_id  ])
             if(rows.length > 0) {
                 return res.status(200).json({exist: rows[0]?.status})
             }
             else {
                 const [rows]= await connection.execute("INSERT INTO student_learning_course (course_id, student_id, time_register, status) VALUES(?, ?, ?, ?)", [course_id, student_id, new Date(), 0])
                 return res.status(200).json({exist: false, register: true})
             }
            
        } catch (error) {
            return res.status(500).json(error)
        }

    }
}

export default handler