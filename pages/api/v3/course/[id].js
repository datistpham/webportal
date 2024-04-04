const { default: connection } = require("../../connect")

const handler= async (req, res)=> {
    const {id }= req.query
    if(req.method=== "DELETE") {
        try {
            const [rows]= await connection.execute("DELETE FROM course WHERE course_id = ?", [
                id,
              ])
              return res.status(200).json({delete: true})
        } catch (error) {
            return res.status(500).json(error)
        }   
    }
}

export default handler