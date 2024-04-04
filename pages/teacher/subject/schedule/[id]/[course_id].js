import * as React from "react";
import Box from "@mui/material/Box";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
// import UpdateStudent from "./Component/UpdateStudent";
// import { DeleteOutlined } from "@ant-design/icons";
// import swal from "sweetalert";
// import { Button } from "@mui/material";
// import get_student_homeroom from "@/app/api/teacher/get_student_homeroom";
// import Cookies from "js-cookie";
import { useRouter } from "next/router";
import get_student_in_class from "@/app/api/get_student_in_class";
import Teacher from "@/pages/teacher";
import moment from "moment";
import get_schedule_class_subject from "@/app/api/teacher/subject/get_schedule_class_subject";
const TeacherManageStudents = () => {
  return (
    <Teacher>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <StudentData />
      </div>
    </Teacher>
  );
};

function StudentData() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");
  const weekDays = [];
  let day = startOfWeek;
  while (day <= endOfWeek) {
    weekDays.push(day);
    day = day.clone().add(1, "d");
  }
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState([]);
  const router = useRouter();
  const { id, course_id } = router.query;
  //   console.log(id)
  React.useEffect(() => {
    (async () => {
      // uid teacher
      if (id) {
        const result = await get_schedule_class_subject(id, course_id);
        setData(result);
      }
    })();
  }, [change, id, course_id]);

  return (
    <Box sx={{ width: "100%" }}>
      <div></div>
      <br />
      <div></div>
      <div style={{ width: "100%" }} className={"wrap__schedule"}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              border: "1px solid #000",
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Day
          </div>
          {weekDays.map((day, index) => (
            <div
              style={{
                flex: "1 1 0",
                border: "1px solid #000",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              {days[day.day()]} - {day.format("DD/MM/YYYY")}
            </div>
          ))}
        </div>

        {/* Shift 1 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              height: 100,
              padding: "20px 10px",
              border: "1px solid #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Morning
          </div>
          {weekDays.map((day, index) => (
            <div
              style={{
                flex: "1 1 0",
                height: 100,
                padding: "20px 10px",
                border: "1px solid #000",
              }}
              key={index}
            >
              {data?.filter(
                (item) =>
                  item?.day_schedule === day.format("DD/MM/YYYY") &&
                  parseInt(item?.shift) === 1
              )?.length > 0 && (
                <div>
                  peirod{" "}
                  {
                    data?.filter(
                      (item) =>
                        item?.day_schedule === day.format("DD/MM/YYYY") &&
                        item?.shift === 1
                    )?.[0]?.time_start
                  }{" "}
                  -{" "}
                  {
                    data?.filter(
                      (item) =>
                        item?.day_schedule === day.format("DD/MM/YYYY") &&
                        item?.shift === 1
                    )?.[0]?.time_end
                  }{" "}
                  (
                  {
                    data?.filter(
                      (item) =>
                        item?.day_schedule === day.format("DD/MM/YYYY") &&
                        item?.shift === 1
                    )?.[0]?.course_name
                  }
                  )
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Shift 2 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              height: 100,
              padding: "20px 10px",
              border: "1px solid #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Afternoon
          </div>
          {weekDays.map((day, index) => (
            <div
              style={{
                flex: "1 1 0",
                height: 100,
                padding: "20px 10px",
                border: "1px solid #000",
              }}
              key={index}
            >
              {data?.filter(
                (item) =>
                  item?.day_schedule === day.format("DD/MM/YYYY") &&
                  item?.shift === 2
              )?.length > 0 &&  <div>
              peirod{" "}
              {
                data?.filter(
                  (item) =>
                    item?.day_schedule === day.format("DD/MM/YYYY") &&
                    item?.shift === 2
                )?.[0]?.time_start
              }{" "}
              -{" "}
              {
                data?.filter(
                  (item) =>
                    item?.day_schedule === day.format("DD/MM/YYYY") &&
                    item?.shift === 2
                )?.[0]?.time_end
              }{" "}
              (
              {
                data?.filter(
                  (item) =>
                    item?.day_schedule === day.format("DD/MM/YYYY") &&
                    item?.shift === 2
                )?.[0]?.course_name
              }
              )
            </div>}
            </div>
          ))}
        </div>
        {/* Shift 3 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              height: 100,
              padding: "20px 10px",
              border: "1px solid #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Evening
          </div>
          {weekDays.map((day, index) => (
            <div
              style={{
                flex: "1 1 0",
                height: 100,
                padding: "20px 10px",
                border: "1px solid #000",
              }}
              key={index}
            >
              {data?.filter(
                (item) =>
                  item?.day_schedule === day.format("DD/MM/YYYY") &&
                  item?.shift === 3
              )?.length > 0 &&  <div>
              peirod{" "}
              {
                data?.filter(
                  (item) =>
                    item?.day_schedule === day.format("DD/MM/YYYY") &&
                    item?.shift === 3
                )?.[0]?.time_start
              }{" "}
              -{" "}
              {
                data?.filter(
                  (item) =>
                    item?.day_schedule === day.format("DD/MM/YYYY") &&
                    item?.shift === 3
                )?.[0]?.time_end
              }{" "}
              (
              {
                data?.filter(
                  (item) =>
                    item?.day_schedule === day.format("DD/MM/YYYY") &&
                    item?.shift === 3
                )?.[0]?.course_name
              }
              )
            </div>}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

export default TeacherManageStudents;
