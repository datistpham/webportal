import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "DELETE") {
        try {
            const {id }= req.query
            const [rows]= await connection.execute("DELETE FROM schedule WHERE id= ?", [id])
            return res.status(200).json({delete: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler