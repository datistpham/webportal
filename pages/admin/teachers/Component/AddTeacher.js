import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import get_list_class from "@/app/api/get_list_class";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import add_student from "@/app/api/admin/add_student";
import swal from "sweetalert";
import add_teacher from "@/app/api/admin/add_teacher";
import { DatePicker } from "antd";
import UploadImage from "@/utils/UploadImage";
import upload_image from "@/app/api/upload_image";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTeacher(props) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [avatar, setAvatar] = React.useState();
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [classId, setClassId] = React.useState();
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
      <Button color={"primary"} variant="contained" onClick={handleClickOpen}>
        Add teacher
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add teacher"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            style={{ margin: "12px 0" }}
            label={"First name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            style={{ margin: "12px 0" }}
            label={"Middle name"}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <TextField
            fullWidth
            style={{ margin: "12px 0" }}
            label={"Last name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            style={{ margin: "12px 0" }}
            label={"Phone"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classId}
              label="Age"
              renderValue={() => {
                // console.log(classList?.find(item=> parseInt(item?.class_id) === parseInt(classId))?.class_name)
                return classList?.find(
                  (item) => parseInt(item?.class_id) === parseInt(classId)
                )?.class_name;
              }}
            >
              {classList?.map((item, key) => (
                <MenuItem
                  onClick={() => setClassId(item?.class_id)}
                  key={key}
                >
                  {item?.class_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
            style={{ width: "100%", height: 50, margin: "12px 0" }}
            onChange={(date, dateString) => {
              setDob(date?.format("DD/MM/YYYY"));
            }}
          />
          <UploadImage
            style={{ width: "100%", height: 50, margin: "12px 0" }}
            setImage={setAvatar}
            title={"Avatar"}
          />
          <TextField
            fullWidth
            style={{ margin: "12px 0" }}
            label={"Account"}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <TextField
            fullWidth
            style={{ margin: "12px 0" }}
            type="password"
            label={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={async () => {
              try {
                if (avatar.thumbUrl) {
                  const avatarfinal = await upload_image(avatar.thumbUrl);

                  const result = await add_teacher({
                    firstName,
                    lastName,
                    dob,
                    phone,
                    middleName,
                    account,
                    password,
                    avatar: avatarfinal.img,
                    classId: classId
                  });
                  if (result?.add === true) {
                    swal("Notice", "Added teacher", "success")
                      .then(() => props?.setChange((prev) => !prev))
                      .then(() => {
                        setFirstName("");
                        setLastName("");
                        setMiddleName("");
                        // setDob("")
                        setPhone("");
                        setAccount("");
                        setPassword("");
                      });
                  } else {
                    swal("Notice", "Error unknown", "error");
                  }
                }
                handleClose();
              } catch (e) {
                console.log(e);
                swal("Notice", "Error server", "error");
              }
            }}
          >
            Create
          </Button>
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
      <FormControl fullWidth>
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
