import connection from "../../connect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM post"
      );
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
        const [rows]= await connection.execute("INSERT INTO post(content, time_created, title, image) VALUES(?, ?, ?, ?)", [req.body.content, new Date(), req.body.title, req.body.image])
        return res.status(200).json({add: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }
  }
  else if(req.method=== "PATCH" ) {
    try {
      const {content, title, image, id}= req.body
      const [rows]= await connection.execute("UPDATE post SET content= ?, title= ?, image= ? WHERE id= ?", [content, title, image, id])
      return res.status(200).json({update: true})
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  else if (req.method === "DELETE") {
    try {
      await connection.execute("DELETE FROM post WHERE id = ?", [
        req.body.student_id || "",
      ]);
      return res.status(200).json({ delete: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default handler;
