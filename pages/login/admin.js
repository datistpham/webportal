import React, { useState } from 'react';
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
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import Header from '@/component/Header';
import { useRouter } from 'next/router';
import login from '@/app/api/login';
import swal from 'sweetalert';
import Header from '@/app/component/Header';
import Cookies from 'js-cookie';

function Login() {
  const router= useRouter()
  const [account, setAccount]= useState("")
  const [password, setPassword]= useState("")

  return (
    <MDBContainer fluid>
      <Header />
      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Admin login</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput value={account} onChange={(e)=> setAccount(e.target.value)} label='Your Account' id='form2' type='text'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput value={password} onChange={(e)=> setPassword(e.target.value)} label='Password' id='form3' type='password'/>
              </div>

              <MDBBtn onClick={async ()=> {
                const result= await login(account, password)
                if(result?.exist=== false ) {
                  swal("Notice", "Account or password is not correct, try again", "error")
                }
                else {
                  swal("Notice", "Login is successfully", "success")
                  .then(() => {
                    Cookies.set("uid", result?.uid);
                    Cookies.set("role", result?.role);
                    Cookies.set("sid", result?.sid)

                  })
                  if(result?.role=== 1) {
                    router.push("/student")
                  }
                  else if(result?.role=== 2) {
                    router.push("/teacher")
                  }
                  else if(result?.role=== 3) {
                    router.push("/admin")
                  }

                }
              }} className='mb-4' size='lg'>Login</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;