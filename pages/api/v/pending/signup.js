import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "POST") {
        try {
            const {email, firstName, middleName, lastName, dob, phone, classId, avatar}= req.body
            const [rows]= await connection.execute("INSERT INTO sign_up_student(email, first_name, middle_name, last_name, dob, phone, class_id, avatar) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [email, firstName, middleName, lastName, dob, phone, classId, avatar])
            return res.status(200).json({add: true})
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler