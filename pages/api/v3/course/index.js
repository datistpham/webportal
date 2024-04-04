import connection from "../../connect";

const apiCourse = async (req, res) => {
  if (req.method === "GET") {
    try {
      const [rows] = await connection.execute(
        "SELECT *, course.course_id AS id FROM course "
      );
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      // console.log(req.body)
      const {courseName, courseDescription, courseLesson}= req.body
      // const account_id= v4()
      const [rows]= await connection.execute("INSERT INTO course(course_name, course_description, lesson_number) VALUES(?, ?, ?)", [courseName || "", courseDescription || "", courseLesson || ""])
      return res.status(200).json({ message: "add success", add :true});
      
    } catch (error) {
      return res.status(500).json(error)
    }
  } else if (req.method === "PATCH") {
    const { courseName, courseDescription, courseLesson, courseId } = req.body;
    try {
      await connection.execute("UPDATE course SET course_name= ?, course_description= ?, lesson_number= ? WHERE course_id= ?", [courseName, courseDescription, courseLesson, courseId]);
      return res.status(200).json({ update: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default apiCourse;
