import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { DatePicker, Input } from "antd";
import get_list_class from "@/app/api/get_list_class";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import add_schedule from "@/app/api/admin/add_schedule";
import swal from "sweetalert";
import axios from "axios";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
 const {setChange}= props
  const [daySchedule, setDaySchedule] = React.useState();
  const [classes, setClasses] = React.useState();
  const [course, setCourse]= React.useState()
  const [shift, setShift] = React.useState();
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [listClass, setListClass] = React.useState([]);
  const [courseList, setCourseList]= React.useState([])

  React.useEffect(() => {
    (async () => {
      const result = await get_list_class();
      return setListClass(result);
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
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleClick= async ()=> {
    const result= await add_schedule({start, end, daySchedule, classId: classes, shift, courseId: course})
    if(result?.ok=== true) {
        swal("Notice", "Add schedule successfully", "success")
        .then(()=> setChange(prev=> !prev))
        .then(()=> handleClose())
    }
    else {
        swal("Notice", "Add schedule failed", "error")
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add schedule</DialogTitle>
      <div style={{ padding: 20, width: 600 }}>
        {/* <Input value /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classes || ""}
            label="Class"
            onChange={(e) => setClasses(e.target.value)}
          >
            {listClass?.map((item, key) => (
              <MenuItem key={key} value={item?.class_id}>
                {item?.class_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div></div>
        <br />
        <div></div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={course || ""}
            label="Course"
            onChange={(e) => setCourse(e.target.value)}
          >
            {courseList?.map((item, key) => (
              <MenuItem key={key} value={item?.course_id}>
                {item?.course_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div></div>
        <br />
        <div></div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shift || ""}
            label="Shift"
            onChange={(e) => setShift(e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <div></div>
        <br />
        <div></div>
        <FormControl fullWidth>
          <TextField value={start} onChange={(e)=>  setStart(e.target.value)} label="Start from" fullWidth />
        </FormControl>
        <div></div>
        <br />
        <div></div>
        <FormControl fullWidth>
          <TextField label="End to" fullWidth value={end} onChange={(e)=> setEnd(e.target.value)} />
        </FormControl>
        <DatePicker
          getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
          }}
          style={{ width: "100%", height: 50, margin: "12px 0", zIndex: 9999 }}
          onChange={(date, dateString) => {
            setDaySchedule(date?.format("DD/MM/YYYY"));
          }}
        />
      <Button onClick={handleClick} style={{marginBottom: 24}} variant="contained">Submit</Button>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddSchedule(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add schedule
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        {...props}
      />
    </div>
  );
}
