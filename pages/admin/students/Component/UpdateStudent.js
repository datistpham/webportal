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
import { DatePicker } from "antd";
import UploadImage from "@/utils/UploadImage";
import upload_image from "@/app/api/upload_image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateStudent(props) {
  const [open, setOpen] = React.useState(false);
  const [studentId, setStudentId]= React.useState(props?.id)
  const [firstName, setFirstName] = React.useState(props?.first_name);
  const [middleName, setMiddleName] = React.useState(props?.middle_name);
  const [lastName, setLastName] = React.useState(props?.last_name);
  const [dob, setDob] = React.useState(props?.dob);
  const [phone, setPhone] = React.useState(props?.phone);
  const [avatar, setAvatar]= React.useState()
  const [classId, setClassId] = React.useState(props?.class_id);
  const [classList, setClassList] = React.useState([]);
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
        <DialogTitle>{"Update student information?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{padding: 10}}>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"First name"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Middle name"}
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Last name"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <DatePicker getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }} style={{width: "100%", height: 50, margin: "12px 0"}} onChange={(date, dateString)=> {
            setDob(date?.format("DD/MM/YYYY"))
          }} />
          <div></div>
            <br />
            <div></div>
          <UploadImage style={{width: "100%", height: 50, margin: "12px 0"}} setImage={setAvatar} title={"Avatar"} />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 400, height: 50 }}
              label={"Phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div></div>
            <br />
            <div></div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={classId}
                label="Age"
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async ()=> {
            try {
              if(avatar?.thumbUrl) {
                const avatarfinal= await upload_image(avatar?.thumbUrl)
                const result= await update_student({firstName, lastName, middleName, phone, dob, class_id: classId, student_id: studentId,avatar: avatarfinal.img})
                if(result?.update=== true) {
                  swal("Notice", "Updated student", "success")
                  .then(()=> props?.setChange(prev=> !prev))
                }
                else {
                    swal("Notice", "Error unknown", "error")
                  }
                handleClose()

              }
              else {
                const result= await update_student({firstName, lastName, middleName, phone, dob, class_id: classId, student_id: studentId, avatar: props?.avatar})
                if(result?.update=== true) {
                  swal("Notice", "Updated student", "success")
                  .then(()=> props?.setChange(prev=> !prev))
                }
                else {
                    swal("Notice", "Error unknown", "error")
                  }
                handleClose()
                }
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
