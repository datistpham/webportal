import connection from "../../connect"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {id }= req.query
            const [rows]= await connection.execute("SELECT * FROM post WHERE id= ?", [id])
            return res.status(200).json(rows[0])
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default handler