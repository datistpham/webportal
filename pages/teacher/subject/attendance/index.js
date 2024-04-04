import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
// import UpdateStudent from "./Component/UpdateStudent";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";
// import { Button } from "@mui/material";
// import Teacher from "..";
import get_student_homeroom from "@/app/api/teacher/get_student_homeroom";
import Cookies from "js-cookie";
import Teacher from "../..";
import get_list_class_subject from "@/app/api/teacher/subject/get_list_class_subject";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
const TeacherManageStudentsSubject = () => {
  return (
    <Teacher>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <StudentData />
      </div>
    </Teacher>
  );
};

function StudentData() {
  const router= useRouter()
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "class_name",
      headerName: "Class name",
      width: 150,
      editable: true,
    },
    {
      field: "course_name",
      headerName: "Subject",
      width: 150,
      editable: true,
    },
    {
      headerName: "Action",
      width: 250,
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
            {/* <UpdateStudent {...params.row} setChange={setChange} /> */}
            <Button onClick={()=> router.push("/teacher/subject/attendance/"+ params.row?.class_id + "/" + params.row?.course_id)} variant="contained">Access attendance</Button>
          </div>
        );
      },
    },
  ];
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      // uid teacher
      const result= await get_list_class_subject(Cookies.get("uid"))
      setData(result);
    })();
  }, [change]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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

export default TeacherManageStudentsSubject;
