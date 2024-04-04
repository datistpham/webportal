import connection from "../../connect"

const apiClasses= async (req, res)=> {
    if(req.method=== "GET") {
        const [rows]= await connection.execute("SELECT *, class.class_id AS id FROM class")
        return res.status(200).json(rows)
    }
    else if(req.method=== "POST") {
        return res.status(200).json({message: "Post method"})
    }
}

export default apiClasses