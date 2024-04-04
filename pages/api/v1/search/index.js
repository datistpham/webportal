import connection from "../../connect"
import Fuse from "fuse.js"

const handler= async (req, res)=> {
    if(req.method=== "GET") {
        try {
            const {querySearch }= req.query
            const [rows]= await connection.execute("SELECT * FROM post")
            const options = {
                keys: [
                  "title"
                ]
              };
              const fuse = new Fuse(rows, options);
            return res.status(200).json(fuse.search(querySearch).map(({item})=> item))
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export default handler