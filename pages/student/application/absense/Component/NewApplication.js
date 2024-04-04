import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextareaAutosize } from '@mui/material';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import uploadFile from '@/app/api/upload-file';
import add_application_absense from '@/app/api/student/add_application_absense';
import swal from 'sweetalert';
const { RangePicker } = DatePicker;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewApplication(props) {
  const [open, setOpen] = React.useState(false);
  const [fileAttach, setFileAttach]= React.useState()
  const [startDate, setStartDate]= React.useState()
  const [endDate, setEndDate]= React.useState()
  const [content, setContent]= React.useState()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    // console.log('onOk: ', value[0].format("DD-MM-YYYY"));
    setStartDate(value[0].format("DD-MM-YYYY"))
    setEndDate(value[1].format("DD-MM-YYYY"))
    
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New application
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New application"}</DialogTitle>
        <DialogContent>
          <textarea value={content} onChange={(e)=> setContent(e.target.value)} placeholder={"Reason"} style={{width: 500, fontSize: 16, backgroundColor: "#d7d7d7", height: 300, resize: "none", outline: "none", borderRadius: 10, padding: 10, color: '#000'}} rows={4}>

          </textarea>
          <br />
          <br />
          <div className="file-input-container">
            <input onChange={(e)=> setFileAttach(e.target.files)} type="file" className="file-input" />
            <button type="button" className="file-button">File attach</button>
            <span className="file-icon"><i className="fas fa-file"></i></span>
            <span style={{marginLeft: 12}}>{fileAttach && (Object?.values(fileAttach)?.[0]?.name)}</span>
        </div>
        <br />
        <div></div>
        <br />
        <RangePicker
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }} 
            showTime={{
                format: 'HH:mm',
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
            getPopupContainer={(triggerNode) => {
                return triggerNode.parentNode;
            }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant={"contained"} onClick={async ()=> {
            const formData= new FormData()
            formData.append("file", Object.values(fileAttach)?.[0])
            const fileUpload= await uploadFile(formData)
            const result= await add_application_absense(content, fileUpload?.file, startDate, endDate, props?.student_id, props?.class_id)
            if(result?.add=== true) {
              swal("Notice", "Add application absense request", "success")
              .then(()=> handleClose())
              .then(()=> {
                setFileAttach()
                setContent()
                setStartDate()
                setEndDate()
              })
            }
            // console.log(fileUpload)
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
