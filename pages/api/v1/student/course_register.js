import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        const {student_id }= req.query
        try {
            const [rows]= await connection.execute("SELECT * FROM student_learning_course INNER JOIN course ON course.course_id = student_learning_course.course_id WHERE student_id= ?", [student_id])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "PATCH") {
        const {student_id, firstName, middleName, lastName, dob, phone }= req.body
        try {
            const [rows]= await connection.execute("UPDATE student SET first_name= ?, middle_name= ?, last_name= ?, dob= ?, phone= ? WHERE student_id= ?", [firstName, middleName, lastName, dob, phone, student_id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler