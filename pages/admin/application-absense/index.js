import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";
// import { Button } from "@mui/material";
// import get_student_homeroom from "@/app/api/teacher/get_student_homeroom";
// import get_scrore_homeroom from "@/app/api/teacher/score/get_score_homeroom";
// import UpdateScore from "./Component/UpdateScore";
import { Button, Checkbox } from "@mui/material";
import moment from "moment";
import attendance_mark from "@/app/api/teacher/attendance_mark";
import get_manage_absense_for_teacher from "@/app/api/teacher/get_manage_attendance_for_teacher";
import Admin from "..";
import get_application_absense from "@/app/api/admin/get_application_absense";
const AdminManaAbsense = () => {
  return (
    <Admin>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <ManageAbsense />
      </div>
    </Admin>
  );
};

function ManageAbsense() {
  const [attendance, setAttendance]= React.useState()
//   const {homeRoom }= React.useContext(TeacherContext)
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState([]);
//   const attendanceHandler= async (e, student_id, class_id= homeRoom)=> {
//     setAttendance(!attendance)
//     if(!attendance) {
//         const result= await attendance_mark({student_id, class_id, attendance: 1})
//         setChange(prev=> !prev)
//     }
//     else {
//         const result= await attendance_mark({student_id, class_id, attendance: 0})
//         setChange(prev=> !prev)
//     }
//   }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
    },
    {
      field: "middle_name",
      headerName: "Middle name",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
    },
    {
        field: "course_name",
        headerName: "Subject",
        width: 150,
    },
    {
        field: "class_name",
        headerName: "Class",
        width: 150,
    },
    {
      field: "content",
      headerName: "Reason",
      width: 250,
    },
    {
      field: "attach_file",
      headerName: "File attach",
      width: 250,
      renderCell: (params)=> {
        return <a style={{color: "#2e89ff"}} target="_blank" href={window.location.origin+ "/uploads"+ "/" + params.row.attach_file}>Here</a>
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
            {/* <ViewAttendance {...params.row} /> */}
            <Button type={"primary"} variant={"contained"} onClick={()=> {
              swal("", "", {buttons: {
                ok: "Approve",
                no: "Refuse",
                cancel: "Cancel"
              }})
              .then(value=> {
                if(value=== "ok") {

                }
                else if(value=== "no") {

                }
                else {
                  return null
                }
              })
            }}>Action</Button>
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
        const result= await get_application_absense()
        setData(result);
    })();
  }, [change]);

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

export default AdminManaAbsense;
