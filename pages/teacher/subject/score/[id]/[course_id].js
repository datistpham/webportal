import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";
// import { Button } from "@mui/material";
// import Teacher, { TeacherContext } from "..";
import get_student_homeroom from "@/app/api/teacher/get_student_homeroom";
import get_scrore_homeroom from "@/app/api/teacher/score/get_score_homeroom";
// import UpdateScore from "./Component/UpdateScore";
import { useRouter } from "next/router";
import get_list_score_class_subject from "@/app/api/teacher/subject/get_list_score_class_subject";
import Teacher, { TeacherContext } from "@/pages/teacher";
import UpdateScore from "../Component/UpdateScore";
import { Button } from "antd";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import get_student_in_class from "@/app/api/get_student_in_class";
import axios from "axios";
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
  const { homeRoom } = React.useContext(TeacherContext);
  const router = useRouter();
  const { id, course_id } = router.query;
  const [data, setData] = React.useState([]);
  const [change, setChange] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [studentList, setStudentList] = React.useState([]);
  const [studentId, setStudentId] = React.useState();
  const [score1, setScore1]= React.useState()
  const [score2, setScore2]= React.useState()
  const [midTerm, setMidTerm]= React.useState()
  const [finalTerm, setFinalTerm]= React.useState()
  const handleSubmit= async ()=> {
    try {
      const res= await axios({
        url: "/api/v2/subject/score",
        method: "POST",
        data: {
          class_id: id, course_id, student_id: studentId, score_1: score1, score_2: score2 ,mid_term: midTerm, final_term: finalTerm
        }
      })
      const result= await res.data
      if(result?.ok=== true) {
        setChange(prev=> !prev)
        swal("Notice", "Add score successfully", "success").then(()=> handleClose())
      }
      else {
        swal("Error", "Error", "error")
      }
    } catch (error) {
      swal("Error", "Error", "error")
      
    }
  }
  //   console.log(id)
  React.useEffect(() => {
    (async () => {
      // uid teacher
      if (id) {
        const result = await get_student_in_class(id);
        setStudentList(result); 
      }
    })();
  }, [change, id]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    (async () => {
      // uid teacher
      const result = await get_list_score_class_subject(id, course_id);
      setData(result);
    })();
  }, [change, id, course_id]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <div></div>
      <br />
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add score
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add score"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField value={score1} onChange={(e)=> setScore1(e.target.value)} placeholder="Score 1" fullWidth />
              <div></div>
              <br></br>
              <div></div>
              <TextField value={score2} onChange={(e)=> setScore2(e.target.value)} placeholder="Score 2" fullWidth />
              <div></div>
              <br></br>
              <div></div>
              <TextField value={midTerm} onChange={(e)=> setMidTerm(e.target.value)} placeholder="Mid term" fullWidth />
              <div></div>
              <br></br>
              <div></div>
              <TextField value={finalTerm} onChange={(e)=> setFinalTerm(e.target.value)} placeholder="Final term" fullWidth />
              <div></div>
              <br></br>
              <div></div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Student</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={studentId}
                  renderValue={() => {
                    // console.log(classList?.find(item=> parseInt(item?.class_id) === parseInt(classId))?.class_name)
                    return studentList?.find(
                      (item) =>
                        parseInt(item?.student_id) === parseInt(studentId)
                    )?.last_name;
                  }}
                >
                  {studentList?.map((item, key) => (
                    <MenuItem
                      onClick={() => setStudentId(item?.student_id)}
                      key={key}
                    >
                      {item?.first_name} {item?.middle_name} {item?.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
