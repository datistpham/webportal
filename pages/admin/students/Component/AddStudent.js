import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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
import { DatePicker, Upload } from "antd";
import UploadImage from "@/utils/UploadImage";
import upload_image from "@/app/api/upload_image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddStudent(props) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [phone, setPhone]= React.useState("")
  const [avatar, setAvatar]= React.useState("")
  const [account, setAccount]= React.useState("")
  const [password, setPassword]= React.useState("")
  const [classChoose, setClassChoose]= React.useState()
  const [listClass, setListClass] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const result = await get_list_class();
      return setListClass(result);
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
      <Button color={"primary"} variant="contained" onClick={handleClickOpen}>
        Add student
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
            label={"First name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Middle name"}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Last name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Phone"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <DatePicker getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }} style={{width: "100%", height: 50, margin: "12px 0"}} onChange={(date, dateString)=> {
            setDob(date?.format("DD/MM/YYYY"))
          }} />
          <UploadImage style={{width: "100%", height: 50, margin: "12px 0"}} setImage={setAvatar} title={"Avatar"} />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            label={"Account"}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <TextField
            style={{ margin: "12px 0", width: 535 }}
            type="password"
            label={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classChoose || ""}
              label="Class"
              onChange={(e)=> setClassChoose(e.target.value)}
            >
              {
                listClass?.map((item, key)=> <MenuItem key={key} value={item?.class_id}>{item?.class_name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={async ()=> {
            try {
              console.log(avatar)
              if(avatar.thumbUrl) {
                const avatarfinal= await upload_image(avatar.thumbUrl)
                const result= await add_student({firstName, lastName, dob, phone, middleName, account, password, class_id: classChoose, avatar: avatarfinal.img})
                if(result?.add=== true) {
                  swal("Notice", "Added student", "success")
                  .then(()=> props?.setChange(prev=> !prev))
                  .then(()=> {
                    setFirstName("")
                    setLastName("")
                    setMiddleName("")
                    // setDob("")
                    setPhone("")
                    setAccount("")
                    setPassword("")
                    setClassChoose("")
                    // setAvatar()
                  })
                }
                else {
                  swal("Notice", "Error unknown", "error")
                }
              }
              handleClose()
            }
            catch(e) {
              console.log(e)
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
