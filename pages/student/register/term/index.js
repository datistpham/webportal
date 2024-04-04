import * as React from "react";
import Box from "@mui/material/Box";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
// import UpdateStudent from "./Component/UpdateStudent";
import { DeleteOutlined } from "@ant-design/icons";
// import { Button } from "@mui/material";
import Cookies from "js-cookie";
import Student from "../..";
import get_course_register from "@/app/api/student/get_course_register";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import swal from "sweetalert";
import RegisterCourse from "./Component/RegisterCourse";
import UpdateRegisterCourse from "./Component/UpdateRegisterCourse";
import moment from "moment";

const StudentProfile = () => {
  return (
    <Student>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <StudentData />
      </div>
    </Student>
  );
};

function StudentData() {
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "course_name",
      headerName: "Subject name",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => {
        if (params.row.status === 0) {
          return "Request";
        } else if (params.row.status === 1) {
          return "Learning";
        } else {
          return "Unknown";
        }
      },
    },
    {
      field: "time_register",
      headerName: "Time register",
      width: 350,
      editable: true,
      renderCell: (params) => {
        return moment(params.row.time_register).format("DD-MM-YYYY HH:mm:ss");
      },
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
            <UpdateRegisterCourse setChange={setChange} {...params.row} />
            <DeleteOutlined
              onClick={async () => {
                swal("Notice", "Are you sure want to delete this request", {
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
  React.useEffect(() => {
    (async () => {
      // uid teacher
      const result = await get_course_register(Cookies.get("uid"));
      return setData(result);
    })();
  }, [change]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <RegisterCourse setChange={setChange} />
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

export default StudentProfile;
