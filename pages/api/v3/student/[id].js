import connection from "../../connect";

const handler= async (req, res)=> {
    const {id }= req.query
    if(req.method=== "GET") {
        try {
            const [rows]= await connection.execute("SELECT * FROM student WHERE class_id= ?", id)
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    if(req.method=== "DELETE") {
        try {
            const [rows]= await connection.execute("DELETE FROM student WHERE student_id = ?", [
                id,
              ])
              return res.status(200).json({delete: true})
        } catch (error) {
            return res.status(500).json(error)
        }   
    }
}

export default handler