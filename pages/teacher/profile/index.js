import * as React from "react";
import Box from "@mui/material/Box";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import axios from "axios";
// import { DeleteOutlined } from "@ant-design/icons";
// import swal from "sweetalert";
// import { Button } from "@mui/material";
// import UpdateScore from "./Component/UpdateScore";
import Teacher, { TeacherContext } from "..";
import UpdateProfile from "./Component/UpdateProfile";
import get_profile_teacher from "@/app/api/teacher/get_profile_teacher";
import Cookies from "js-cookie";
import { Image } from "antd";
const TeacherManageScore = () => {
  return (
    <Teacher>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <TeacherProfile />
      </div>
    </Teacher>
  );
};


function TeacherProfile() {
    const [data, setData] = React.useState([]);
    const [change, setChange] = React.useState(false);
    React.useEffect(() => {
      (async () => {
        // uid teacher
        const result= await get_profile_teacher(Cookies.get("uid"))
        return setData(result[0])
      })();
    }, [change]);
  
    return (
      <Box sx={{ height: 400, width: "100%", padding: 1}}>
          <div style={{color: "#000", display: "flex", alignItems: "center", marginBottom: 12}}><div style={{width: 120}}>First name: </div><strong>{data?.first_name}</strong></div>
          <div style={{color: "#000", display: "flex", alignItems: "center", marginBottom: 12}}><div style={{width: 120}}>Middle name: </div><strong>{data?.middle_name}</strong></div>
          <div style={{color: "#000", display: "flex", alignItems: "center", marginBottom: 12}}><div style={{width: 120}}>Last name: </div><strong>{data?.last_name}</strong></div>
          <div style={{color: "#000", display: "flex", alignItems: "center", marginBottom: 12}}><div style={{width: 120}}>DOB: </div><strong>{data?.dob}</strong></div>
          <div style={{color: "#000", display: "flex", alignItems: "center", marginBottom: 12}}><div style={{width: 120}}>Phone: </div><strong>{data?.phone}</strong></div>
          <div style={{color: "#000", display: "flex", alignItems: "center", marginBottom: 12}}><div style={{width: 120}}>Avatar: </div>
          <Image alt={""} src={data?.avatar} style={{width: 100, height: 100, borderRadius: "50%", objectFit: "none", color: "#000", display: "flex", alignItems: "center", marginBottom: 12}} />
        </div>
          <br />
          <UpdateProfile {...data} setChange={setChange} />
      </Box>
    );
  }
  
  export default TeacherManageScore;
  