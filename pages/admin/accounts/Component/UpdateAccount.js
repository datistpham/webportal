import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateAccount(props) {
  const [open, setOpen] = React.useState(false);
  const [courseName, setCourseName] = React.useState(props?.course_name);
  const [courseDescription, setCourseDescription] = React.useState(props?.course_descripion);
  const [lessonNumber, setLessonNumber] = React.useState(props?.lesson_number);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update teacher information?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{padding: 10}}>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Course name"}
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Course desciption"}
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Lesson number"}
              value={lessonNumber}
              onChange={(e) => setLessonNumber(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
