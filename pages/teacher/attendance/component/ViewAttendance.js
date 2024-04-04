import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Calendar from "react-calendar";
import get_attendance_detail_student from '@/app/api/teacher/attendance/get_attendance_detail_student';
import moment from 'moment';    

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewAttendance(props) {
  const [open, setOpen] = React.useState(false);
  const [attendanceDays, setAttendanceDays] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  React.useEffect(()=> {
    (async ()=> {
        const result= await get_attendance_detail_student(props?.class_id, props?.student_id)
        return setAttendanceDays(result)
    })()
  }, [props])
  return (
    <div>
      <Button type={"primary"} variant="contained" onClick={handleClickOpen}>
        View attendance
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attendance's "+ props?.last_name}</DialogTitle>
        <DialogContent>
        <Calendar
          
          tileContent={({ date, view }) => {
            return (
              <>
                {attendanceDays?.filter(
                  (item) =>
                    moment(item?.time_attendance, "DD-MM-YYYY").format("DD-MM-YYYY") ===
                    moment(date).format("DD-MM-YYYY")
                )?.length > 0 ? (
                  <div className="checked-date">
                    <div className="checked-date-text" style={{height: 50, fontSize: 12}}>Attendance</div>
                  </div>
                ) : <div className="">
                    <div className="checked-date-text" style={{height: 50}}></div>
                  </div>}
              </>
            );
          }}
          onChange={handleDateChange}
          value={selectedDate}
        />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
