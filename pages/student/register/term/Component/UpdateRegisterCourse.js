import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import register_course from "@/app/api/student/register_course";
// import Cookies from "js-cookie";
// import swal from "sweetalert";
// import Checkbox from "@mui/material/Checkbox";
import Switch from '@mui/material/Switch';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateRegisterCourse(props) {
  const [courseId, setCourseId] = useState(props?.course_id);
  const [status, setStatus] = useState(props?.status);
  const [open, setOpen] = React.useState(false);
  const [listCourse, setListCourse] = useState(() => []);
  const [checked, setChecked] = React.useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked === true) {
        setStatus(1)
  }
  else {
    setStatus(0)
  }
}
    useEffect(() => {
        if(props?.status === 1) {
            setChecked(()=> true)
        }
        else {
            setChecked(()=> false)  
        }
    }, [props?.status])
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: "/api/v3/course",
        method: "get",
      });
      const result = await res.data;
      return setListCourse(result);
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Update request
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update register subject"}</DialogTitle>
        <DialogContent>
        <label>Cancel</label>
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
        <label>Register</label>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

