import connection from "@/pages/api/connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        const {teacher_id }= req.query
        try {
            const [rows]= await connection.execute("SELECT * FROM teacher WHERE teacher_id= ?", [teacher_id])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "PATCH") {
        const {teacher_id, firstName, middleName, lastName, dob, phone, avatar }= req.body
        try {
            const [rows]= await connection.execute("UPDATE teacher SET first_name= ?, middle_name= ?, last_name= ?, dob= ?, phone= ?, avatar= ? WHERE teacher_id= ?", [firstName, middleName, lastName, dob, phone, avatar, teacher_id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler