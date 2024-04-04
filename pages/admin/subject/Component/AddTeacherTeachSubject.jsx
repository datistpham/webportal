import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import update_student from "@/app/api/admin/update_student";
import swal from "sweetalert";
import update_teacher_teach_subject from "@/app/api/admin/update_teacher_teach_sibject";
import add_teacher_teach_subject from "@/app/api/admin/add_teacher_teach_subject";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTeacherTeachSubject(props) {
  const [open, setOpen] = React.useState(false);
//   const [id, setId]= React.useState(props?.id)
  const [teacherId, setTeacherId]= React.useState("")
  const [courseId, setCourseId]= React.useState("")
  const [classId, setClassId] = React.useState("");
  const [classList, setClassList] = React.useState([]);
  const [teacherList, setTeacherList]= React.useState([])
  const [courseList, setCourseList]= React.useState([])

  React.useEffect(() => {
    (async () => {
      const res = await axios({
        url: "/api/v3/class",
        method: "get",
      });
      const result = await res.data;
      return setClassList(result);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const res = await axios({
        url: "/api/v3/teacher",
        method: "get",
      });
      const result = await res.data;
      return setTeacherList(result);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const res = await axios({
        url: "/api/v3/course",
        method: "get",
      });
      const result = await res.data;
      return setCourseList(result);
    })();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add teacher to teach subject
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update teacher teach subject?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{padding: 10}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={classId}
                label="Class"
                renderValue={()=> {
                    // console.log(classList?.find(item=> parseInt(item?.class_id) === parseInt(classId))?.class_name)
                    return classList?.find(item=> parseInt(item?.class_id) === parseInt(classId))?.class_name
                }}
              >
                {
                    classList?.map((item)=> <MenuItem onClick={()=> setClassId(item?.class_id)} key={item?.class_id}>{item?.class_name}</MenuItem>)
                }
               
              </Select>
            </FormControl>
            <div></div>
            <br />
            <div></div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teacherId}
                label="Teacher"
                renderValue={()=> {
                    // console.log(classList?.find(item=> parseInt(item?.class_id) === parseInt(classId))?.class_name)
                    return teacherList?.find(item=> parseInt(item?.teacher_id) === parseInt(teacherId))?.first_name + " " + teacherList?.find(item=> parseInt(item?.teacher_id) === parseInt(teacherId))?.middle_name + " " + teacherList?.find(item=> parseInt(item?.teacher_id) === parseInt(teacherId))?.last_name
                }}
              >
                {
                    teacherList?.map((item)=> <MenuItem onClick={()=> setTeacherId(item?.teacher_id)} key={item?.teacher_id}>{item?.first_name} {item?.middle_name} {item?.last_name}</MenuItem>)
                }
              </Select>
            </FormControl>
            <div></div>
            <br />
            <div></div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseId}
                label="Teacher"
                renderValue={()=> {
                    // console.log(classList?.find(item=> parseInt(item?.class_id) === parseInt(classId))?.class_name)
                    return courseList?.find(item=> parseInt(item?.course_id) === parseInt(courseId))?.course_name
                }}
              >
                {
                    courseList?.map((item)=> <MenuItem onClick={()=> setCourseId(item?.course_id)} key={item?.course_id}>{item?.course_name}</MenuItem>)
                }
              </Select>
            </FormControl>
            <div></div>
            <br />
            <div></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async ()=> {
            try {
              const result= await add_teacher_teach_subject({teacherId, classId, courseId})
              if(result?.exist=== false) {
                swal("Notice", "Add success", "success")
                .then(()=> props?.setChange(prev=> !prev))
              }
              else {
                  swal("Notice", "Add failed", "error")
                }
              handleClose()
            }
            catch(error) {
              swal("Notice", "Error server", "error")

            }
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
