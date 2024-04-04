import { v4 } from "uuid";
import connection from "../../connect";

const apiTeacher = async (req, res) => {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.execute(
        "SELECT *, teacher.teacher_id AS id FROM teacher LEFT JOIN teacher_homeroom ON teacher_homeroom.teacher_id = teacher.teacher_id LEFT JOIN class ON class.class_id = teacher_homeroom.class_id"
      );
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      // console.log(req.body)
      const {firstName, lastName, dob, phone, account, password, middleName, avatar, classId}= req.body
      const account_id= v4()
      const [rows]= await connection.execute("INSERT INTO teacher(first_name, middle_name, last_name, dob, phone, account_id, avatar) VALUES(?, ?, ?, ?, ?, ?, ?)", [firstName || "", lastName || "", middleName || "", dob || "", phone || "", account_id || "", avatar || ""])
      const [rows3]= await connection.execute("SELECT * FROM teacher WHERE account_id= ?", [account_id])
      const [rows2]= await connection.execute("INSERT INTO teacher_homeroom(teacher_id, class_id) VALUES(?, ?)", [rows3[0].teacher_id, classId])
      const [rows1]= await connection.execute("INSERT INTO account(account_id, account, password, role) VALUES(?, ?, ?, ?)", [account_id || "", account || "", password || "", 2])
      return res.status(200).json({ message: "add success", add :true});
      
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
  else if(req.method=== "PATCH") {
    try {
      const {firstName, lastName, dob, phone, account, password, middleName, teacher_id, avatar, classId}= req.body
  
      const [rows] =await connection.execute("UPDATE teacher SET first_name= ?, last_name= ?, dob= ?, middle_name= ?, phone= ?, avatar= ? WHERE teacher_id= ?", [firstName, lastName, dob, middleName, phone,avatar, teacher_id])
      const [rows3]= await connection.execute("SELECT * FROM teacher WHERE teacher_id= ?", [teacher_id])
      const [rows2]= await connection.execute("UPDATE teacher_homeroom SET class_id= ? WHERE teacher_id= ?", [classId, rows3[0].teacher_id])
      return res.status(200).json({update: true})
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({update: false, error})
    }
  }
  else if (req.method === "DELETE") {
    const { student_id } = JSON.parse(req.body);
    try {
      await connection.execute("DELETE FROM teacher WHERE teacher_id = ?", [
        student_id,
      ]);
      return res.status(200).json({ delete: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default apiTeacher;
