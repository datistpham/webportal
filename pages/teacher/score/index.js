import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";
// import { Button } from "@mui/material";
import Teacher, { TeacherContext } from "..";
import get_student_homeroom from "@/app/api/teacher/get_student_homeroom";
import get_scrore_homeroom from "@/app/api/teacher/score/get_score_homeroom";
import UpdateScore from "./Component/UpdateScore";
const TeacherManageScore = () => {
  return (
    <Teacher>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <StudentData />
      </div>
    </Teacher>
  );
};

function StudentData() {
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
      field: "score_1",
      headerName: "Score 1",
      width: 150,
      editable: true,
    },
    {
      field: "score_2",
      headerName: "Score 2",
      width: 150,
      editable: true,
    },
    {
        field: "mid_term",
        headerName: "Mid term",
        width: 150,
        editable: true,
      },
      {
        field: "final_term",
        headerName: "Final term",
        width: 150,
        editable: true,
      },
    {
      field: "class_name",
      headerName: "Class",
      width: 110,
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
            <UpdateScore {...params.row} setChange={setChange} />
            {/* <UpdateStudent {...params.row} setChange={setChange} /> */}
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
  const {homeRoom }= React.useContext(TeacherContext)
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      // uid teacher
      const result= await get_scrore_homeroom(9)
      setData(result);
    })();
  }, [change, homeRoom]);

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

export default TeacherManageScore;
