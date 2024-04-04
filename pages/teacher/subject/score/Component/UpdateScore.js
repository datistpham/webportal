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
import update_score_student from "@/app/api/teacher/score/update_score_student";
import update_score_class_subject from "@/app/api/teacher/subject/update_score_class_subject";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateScore(props) {
  const [open, setOpen] = React.useState(false);
  const [classId, setClassId]= React.useState(props?.class_id)
  const [courseId, setCourseId]= React.useState(props?.course_id)
  const [scoreId, setScoreId]= React.useState(props?.id)
  const [studentId, setStudentId]= React.useState(props?.student_id)
  const [score1, setScore1]= React.useState(props?.score_1)
  const [score2, setScore2]= React.useState(props?.score_2)
  const [midTerm, setMidTerm]= React.useState(props?.mid_term)
  const [finalTerm, setFinalTerm]= React.useState(props?.final_term)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update student information?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{padding: 10}}>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Score 1"}
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Score 2"}
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Mid term"}
              value={midTerm}
              onChange={(e) => setMidTerm(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Final term"}
              value={finalTerm}
              onChange={(e) => setFinalTerm(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async ()=> {
            try {
              const result= await update_score_class_subject({score_1: score1, score_2: score2, mid_term: midTerm, final_term: finalTerm, class_id: classId, score_id: scoreId, course_id: courseId, student_id: studentId})
              if(result?.update=== true) {
                swal("Notice", "Updated score student", "success")
                .then(()=> props?.setChange(prev=> !prev))
              }
              else {
                  swal("Notice", "Error unknown", "error")
                }
              handleClose()
            }
            catch(error) {
                console.log(error)
              swal("Notice", "Error server", "error")

            }
          }}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
