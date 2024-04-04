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

function Login() {
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
                Teacher login
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

              <MDBBtn
                onClick={async () => {
                  try {
                    const result = await login(account, password);
                    if (result?.exist === true) {
                      if (result?.role === 2) {
                        swal("Notice", "Login is succsessfully", "success")
                          .then(() => {
                            Cookies.set("uid", result?.uid);
                            Cookies.set("role", result?.role);
                            Cookies.set("sid", result?.sid)

                          })
                          .then(
                            () =>
                              (window.location.href =
                                window.location.origin + "/teacher")
                          );
                      }
                    } else {
                      swal("Notice", "Account is not exist", "error");
                    }
                  } catch (error) {
                    console.log(error)
                    swal("Notice", "Error unknown", "error");
                  }
                }}
                className="mb-4"
                size="lg"
              >
                Login
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
