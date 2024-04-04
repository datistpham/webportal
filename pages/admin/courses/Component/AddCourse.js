import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import get_list_class from "@/app/api/get_list_class";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import add_student from "@/app/api/admin/add_student";
import swal from "sweetalert";
import add_course from "@/app/api/admin/add_course";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCourse(props) {
  const [open, setOpen] = React.useState(false);
  const [courseName, setCourseName]= React.useState("")
  const [courseDescription, setCourseDescription]= React.useState("")
  const [courseLesson, setCourseLesson]= React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color={"primary"} variant="contained" onClick={handleClickOpen}>
        Add course
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add student"}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Course name"}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Course description"}
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Course lesson number"}
            value={courseLesson}
            onChange={(e) => setCourseLesson(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={async ()=> {
            try {
              const result= await add_course({courseName, courseDescription, courseLesson})
              if(result?.add=== true) {
                swal("Notice", "Added course", "success")
                .then(()=> props?.setChange(prev=> !prev))
                .then(()=> {
                  setCourseName("")
                  setCourseDescription("")
                  setCourseLesson("")
                })
              }
              else {
                swal("Notice", "Error unknown", "error")
              }
              handleClose()
            }
            catch(e) {
              swal("Notice", "Error server", "error")
            }
          }}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ListClass() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classChoose}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
