import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
// import { DeleteOutlined } from "@ant-design/icons";
// import swal from "sweetalert";
// import { Button } from "@mui/material";
// import get_student_homeroom from "@/app/api/teacher/get_student_homeroom";
// import get_scrore_homeroom from "@/app/api/teacher/score/get_score_homeroom";
// import UpdateScore from "./Component/UpdateScore";
// import Teacher, { TeacherContext } from "..";
import { Checkbox } from "@mui/material";
import moment from "moment";
import attendance_mark from "@/app/api/teacher/attendance_mark";
import get_list_attendance from "@/app/api/teacher/get_list_attendance";
import Teacher, { TeacherContext } from "@/pages/teacher";
import get_list_attendance_subject from "@/app/api/teacher/subject/get_list_attendance_subject";
import { useRouter } from "next/router";
import ViewAttendance from "../component/ViewAttendance";
const TeacherManageScore = () => {
  return (
    <Teacher>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <ManageAttendance />
      </div>
    </Teacher>
  );
};

function ManageAttendance() {
    const router= useRouter()
    const {id, course_id}= router.query
  const [attendance, setAttendance]= React.useState()
  const {homeRoom }= React.useContext(TeacherContext)
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState([]);
  const attendanceHandler= async (e, student_id, class_id= homeRoom)=> {
    setAttendance(!attendance)
    if(!attendance) {
        const result= await attendance_mark({student_id, class_id, attendance: 1, course_id: parseInt(course_id)})
        setChange(prev=> !prev)
    }
    else {
        const result= await attendance_mark({student_id, class_id, attendance: 0, course_id: parseInt(course_id)})
        setChange(prev=> !prev)
    }
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "middle_name",
      headerName: "Middle name",
      width: 150,
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "attendance",
      headerName: "Attendance"+ " ("+ moment(new Date()).format("DD-MM-YYYY") + ")",
      width: 250,
      editable: true,
      renderCell: (params)=> {
        if(params.row.time_attendance === moment(new Date()).format("DD-MM-YYYY")) {
            return <Checkbox checked={parseInt(params.row?.attendance)=== 1 ? true : false} onChange={(e)=> attendanceHandler(e, params.row.student_id)} />
        }
        else {
            return <Checkbox checked={false} onChange={(e)=> attendanceHandler(e, params.row.student_id)} />
        }
      }
    },
    {
      headerName: "Action",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* <UpdateScore {...params.row} setChange={setChange} /> */}
            {/* <UpdateStudent {...params.row} setChange={setChange} /> */}
            <ViewAttendance {...params.row} />
          </div>
        );
      },
    },
  ];
  
  
  React.useEffect(() => {
    (async () => {
      // uid teacher
      if(homeRoom) {
          const result= await get_list_attendance_subject(id, course_id)
          setData(result);
      }
    })();
  }, [change, id, course_id]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <div style={{fontWeight: 600, fontSize: 18}}>
        List of students in your class
      </div>
      <div></div>
      <br />
      <div></div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default TeacherManageScore;
