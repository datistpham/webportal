import * as React from "react";
import Box from "@mui/material/Box";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
// import UpdateStudent from "./Component/UpdateStudent";
import { DeleteOutlined } from "@ant-design/icons";
// import { Button } from "@mui/material";
import Student, { StudentContext } from "../..";
// import get_profile_student from "@/app/api/student/get_profile";
// import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import NewApplication from "./Component/NewApplication";
import Cookies from "js-cookie";
import get_list_application from "@/app/api/student/get_list_application";
import moment from "moment";
const StudentApplicationAbsense = () => {
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
  const {studentData }= React.useContext(StudentContext)

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "content",
      headerName: "Content",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === 0) {
          return "Request";
        } else if (params.row.status === 1) {
          return "Approved";
        } else {
          return "Unknown";
        }
      },
    },
    {
      field: "time_absense",
      headerName: "Time absense",
      width: 200,
    },
    {
      field: "time_created",
      headerName: "Time created",
      width: 350,
      editable: true,
      renderCell: (params) => {
        return moment(params.row.time_created).format("DD-MM-YYYY HH:mm:ss");
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
            {/* <UpdateRegisterCourse setChange={setChange} {...params.row} /> */}
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
  React.useEffect(() => {
    (async () => {
      if(studentData?.class_id) {
        const result = await get_list_application(Cookies.get("uid"), studentData?.class_id);
        return setData(result);
      }
    })();
  }, [change, studentData]);

  return (
    <Box sx={{ height: 400, width: "100%", padding: 1}}>
      {/* <RegisterCourse setChange={setChange} /> */}
      <NewApplication class_id={studentData?.class_id} student_id={Cookies.get("uid")} />
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

export default StudentApplicationAbsense;
