import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        const {student_id }= req.query
        try {
            const [rows]= await connection.execute("SELECT * FROM student WHERE student_id= ?", [student_id])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "PATCH") {
        const {student_id, firstName, middleName, lastName, dob, phone, avatar }= req.body
        try {
            const [rows]= await connection.execute("UPDATE student SET first_name= ?, middle_name= ?, last_name= ?, dob= ?, phone= ?, avatar= ? WHERE student_id= ?", [firstName, middleName, lastName, dob, phone, avatar, student_id])
            return res.status(200).json({update: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export default handler