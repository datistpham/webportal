import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import register_course from "@/app/api/student/register_course";
import Cookies from "js-cookie";
import swal from "sweetalert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterCourse() {
  const [open, setOpen] = React.useState(false);
  const [courseId, setCourseId]= useState()
  const [listCourse, setListCourse] = useState(() => [])
  useEffect(()=> {
    (async ()=> {
        const res= await axios({
            url: "/api/v3/course",
            method: "get",

        })
        const result= await res.data
        return setListCourse(result)
    })()
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Register a new subject
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Register course"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{width: 500, marginTop: 12}}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={courseId}
              label="Age"
              onChange={(e)=> setCourseId(e.target.value)}
            >
              {
                listCourse?.map((item, key)=> <MenuItem key={key} value={item?.id}>{item?.course_name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={async ()=> {
            try {
                const result= await register_course({student_id: parseInt(Cookies.get("uid")), course_id: courseId})
                if(result?.register=== true) {
                    swal("Notice", "Register's request is sent successfully", "success")
                }
                else {
                    if(result?.exist=== true) {
                        swal("Notice", "You're in this course")
                    }
                    else {
                        swal("Notice", "Register's request is sent")
                    }
                }
            } catch (error) {
                swal("Notice", "Error unknown", "error")
            }
          }}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
