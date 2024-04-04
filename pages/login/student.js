import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Header from "@/component/Header";
import login from "@/app/api/login";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import axios from "axios";
import OTPInput from "react-otp-input";

function Login() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MDBContainer fluid>
      <Header />
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Student login
              </p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  label="Your Account"
                  id="form2"
                  type="text"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="form3"
                  type="password"
                />
              </div>
              <div>
                <ForgotPassword />
              </div>
              <br />

              <MDBBtn
                onClick={async () => {
                  try {
                    const result = await login(account, password);
                    if (result?.exist === true) {
                      if (result?.role === 1) {
                        swal("Notice", "Login is succsessfully", "success")
                          .then(() => {
                            Cookies.set("uid", result?.uid);
                            Cookies.set("role", result?.role);
                            Cookies.set("sid", result?.sid);
                          })

                          .then(
                            () =>
                              (window.location.href =
                                window.location.origin + "/student")
                          );
                      }
                    } else {
                      swal("Notice", "Account is not exist", "error");
                    }
                  } catch (error) {
                    swal("Notice", "Error unknown", "error");
                  }
                }}
                className="mb-4"
                size="lg"
              >
                Login 
              </MDBBtn>
              <br />
              <div className="">You{"'"}re not an account?</div>
              <br />
              <MDBBtn
                onClick={() => {
                  router.push("/signup");
                }}
                className="mb-4"
                size="lg"
              >
                Signup
              </MDBBtn>
              
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState(1);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleClickOpen}>
        Forgot password
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Forgot password"}</DialogTitle>
        <DialogContent>
          {status === 1 && (
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                placeholder={"Your email to recovery password"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 400, height: 40, marginTop: 12 }}
              />
            </DialogContentText>
          )}
          {status === 2 && (
            <DialogContentText id="alert-dialog-slide-description">
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                We{"'"} sent to you a code include 6 digit to complete recover
                password, Please check your email and type code to below field
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    width: 40,
                    height: 40,
                    color: "#000",
                    backgroundColor: "#fff",
                  }}
                  renderSeparator={<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>}
                  renderInput={(props) => (
                    <input
                      style={{ width: 40, height: 40, background: "#fff" }}
                      {...props}
                    />
                  )}
                />
              </div>
            </DialogContentText>
          )}
          {status === 3 && (
            <>
              <TextField
                placeholder={"New password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: 400, height: 40, marginTop: 12 }}
              />
              <div></div>
              <br />
              <div></div>
              <TextField
                placeholder={"Confirm new password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: 400, height: 40, marginTop: 12 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {status === 1 && (
            <Button
              onClick={async () => {
                const res = await axios({
                  url: "/api/v1/find/student",
                  method: "post",
                  data: {
                    email,
                  },
                });
                const result = await res.data;
                if (result?.find === true) {
                  setStatus(2);
                } else {
                  swal("Notice", "Email is not exist, try again", "error");
                }
              }}
            >
              Confirm
            </Button>
          )}
          {status === 2 && (
            <>
              <Button
                variant={"contained"}
                onClick={async () => {
                  const res = await axios({
                    url: "/api/v/complete-signup",
                    method: "post",
                    data: {
                      email,
                      code: otp,
                    },
                  });
                  const result = await res.data;
                  if (result?.complete === true) {
                    setStatus(3);
                  } else {
                    swal(
                      "Notice",
                      "Verify code is not correct, try again",
                      "error"
                    );
                  }
                }}
              >
                Verify code
              </Button>
            </>
          )}
          {status === 3 && (
            <>
              <Button
                variant={"contained"}
                onClick={async () => {
                  if (password.trim() !== confirmPassword.trim()) {
                    return swal(
                      "Notice",
                      "Password is not match, try again",
                      "error"
                    );
                  }
                  const res = await axios({
                    url: "/api/v/reset/password",
                    method: "post",
                    data: {
                      email,
                      password,
                    },
                  });
                  const result = await res.data;
                  if (result?.update === true) {
                    swal(
                      "Notice",
                      "Update password is successfully",
                      "success"
                    ).then(() => handleClose());
                  } else {
                    swal("Notice", "Password is not true, try again", "error");
                  }
                }}
              >
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
