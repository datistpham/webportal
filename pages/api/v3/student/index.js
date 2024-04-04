import { v4 } from "uuid";
import connection from "../../connect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.execute(
        "SELECT *, student.student_id AS id FROM student INNER JOIN class ON class.class_id = student.class_id"
      );
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      // console.log(req.body)
      const {firstName, lastName, class_id, dob, phone, account, password, middleName, avatar}= req.body
      const account_id= v4()
      const [rows]= await connection.execute("INSERT INTO student(first_name, middle_name, last_name, class_id, dob, phone, account_id, avatar) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [firstName || "", lastName || "", middleName || "", class_id || "", dob || "", phone || "", account_id || "", avatar || ""])
      const [rows1]= await connection.execute("INSERT INTO account(account_id, account, password, role) VALUES(?, ?, ?, ?)", [account_id || "", account || "", password || "", 1])
      return res.status(200).json({ message: "add success", add :true});

    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  } 
  else if(req.method=== "PATCH") {
    try {
      const {firstName, lastName, class_id, dob, phone, account, password, middleName, student_id, avatar}= req.body
  
      const [rows] =await connection.execute("UPDATE student SET first_name= ?, last_name= ?, dob= ?, middle_name= ?, phone= ?, class_id= ?, avatar= ? WHERE student_id= ?", [firstName, lastName, dob, middleName, phone, class_id, avatar, student_id])
      return res.status(200).json({update: true})
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({update: false, error})
    }
  }
  else if (req.method === "DELETE") {
    try {
      await connection.execute("DELETE FROM student WHERE student_id = ?", [
        req.body.student_id || "",
      ]);
      return res.status(200).json({ delete: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default handler;
