import Admin from ".."
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
// import UpdateTeacher from "./Component/UpdateTeacher";
import { DeleteOutlined } from "@ant-design/icons";
// import AddTeacher from "./Component/AddTeacher";
// import delete_teacher from "@/app/api/admin/delete_teacher";
// import UpdateTeacherTeachSubject from "./Component/UpdateTeacherTeachSubject";
// import AddTeacherTeachSubject from "./Component/AddTeacherTeachSubject";
import delete_teacher_teach_subject from "@/app/api/admin/delete_teacher_teach_subject";
import delete_schedule from "@/app/api/admin/delete_schedule";
const AdminManageSchedule= ()=> {
    return (
        <Admin>
            <div style={{flex: "1 1 0", height: "100vh", overflow: "auto"}}>
                <ManageSchedule />
            </div>
        </Admin>
    )
}   

function ManageSchedule() {
    const [data, setData]= React.useState([])
    const [change, setChange]= React.useState(false)
    React.useEffect(()=> {
        (async ()=> {
        const res= await axios({
            url: "/api/v3/schedule",
            method: "get"
        })
        const result= await res.data
        return setData(result)
        })()
    }, [change])
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'class_name',
        headerName: 'Class',
        width: 150,
      },
      {
          field: 'course_name',
          headerName: 'Subject',
          width: 150,
        },
      {
        field: 'day_schedule',
        headerName: 'Day schedule',
        width: 150,
      },
      {
        field: 'shift',
        headerName: 'Shift',
        width: 150,
      },
      {
        field: 'time_start',
        headerName: 'Start from',
        width: 150,
      },
      {
        field: 'time_end',
        headerName: 'End to',
        width: 150,
      },
      {
          headerName: 'Action',
          width: 200,
          editable: true,
          renderCell: (params)=> {
              return (
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
                      {/* <UpdateTeacher {...params.row} setChange={setChange} /> */}
                      {/* <UpdateTeacherTeachSubject {...params.row} setChange={setChange} /> */}
                      <DeleteOutlined onClick={async ()=> {
                          swal("Notice", "Are you sure want to delete this schedule of class ?", {buttons: {
                              ok: "Confirm",
                              cancel: "Cancel"
                          }})
                          .then(async value=> {
                              if(value=== "ok") {
                                const result= await delete_schedule(params.row?.id)
                                  if(result?.delete=== true) {
                                      swal("Notice", "Delete schedule successfully", "success")
                                      .then(()=> setChange(prev=> !prev))
                                  }
                                  else {
                                      swal("Notice", "Error unexpected", "error")
                                  }
                              }
                              else {
                                  return null
                              }
                          })
                          .catch(()=> swal("Notice", "Error unexpected", "error"))
                      }} style={{cursor: "pointer"}} title={"Delete teacher"}  />
                  </div>
              )
          }
        }
    ];
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        {/* <AddTeacher setChange={setChange} /> */}
        {/* <AddTeacherTeachSubject setChange={setChange} /> */}
        <div></div>
        <br />
        <div></div>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    );
  }

export default AdminManageSchedule