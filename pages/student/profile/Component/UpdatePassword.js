import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import change_password from '@/app/api/student/change_password';
import swal from 'sweetalert';
import Cookies from 'js-cookie';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdatePassword() {
  const [open, setOpen] = React.useState(false);
  const [oldPassword, setOldPassword]= React.useState("")
  const [newPassord, setNewPassword]= React.useState("")
  const [confirmPassword, setConfirmPassword]= React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update password
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update password"}</DialogTitle>
        <DialogContent>
          <TextField type={"password"} label={"Old password"} style={{width: 500, height: 40, margin: "12px 0"}} value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} />
          <TextField type={"password"} label={"New password"} style={{width: 500, height: 40, margin: "12px 0"}} value={newPassord} onChange={(e)=> setNewPassword(e.target.value)} />
          <TextField type={"password"} label={"Confirm new password"} style={{width: 500, height: 40, margin: "12px 0"}} value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant={"contained"} onClick={async ()=> {
            if(newPassord !== confirmPassword ) {
              return swal("Notice", "Password is not match", "error")
            }
            try {
              const result= await change_password(oldPassword, newPassord, Cookies.get("uid"))
              if(result?.update=== true) {
                swal("Notice", "Password is change", "success")
                .then(()=> handleClose())
              }
              else {
                swal("Notice", "Password is wrong", "error")
              }
            }
            catch(error) {
              console.log(error)
              swal("Notice", "Error unknown", "error")
            }
          }}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
