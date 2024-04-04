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
            {/* <UpdateStudent {...params.row} setChange={setChange} /> */}
            <Button onClick={()=> router.push("/teacher/subject/student/"+ params.row?.class_id)} variant="contained">Access class</Button>
            <DeleteOutlined
              onClick={async () => {
                swal("Notice", "Are you sure want to delete this student", {
                  buttons: {
                    ok: "Confirm",
                    cancel: "Cancel",
                  },
                }).then(async (value) => {
                  if (value === "ok") {
                    const res = await fetch(
                      `/api/v3/student/${params.row.id}`,
                      {
                        method: "DELETE",
                        body: JSON.stringify({ student_id: params.row.id }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const result = await res.json();
                    if (result?.delete === true) {
                      swal(
                        "Notice",
                        "Delete student successfully",
                        "success"
                      ).then(() => setChange((prev) => !prev));
                    } else {
                      swal("Notice", "Error unexpected", "error");
                    }
                  } else {
                    return null;
                  }
                });
              }}
              style={{ cursor: "pointer" }}
              title={"Delete student"}
            />
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
