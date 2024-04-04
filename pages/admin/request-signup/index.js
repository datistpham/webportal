import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import Admin from '..';
// import UpdateStudent from './Component/UpdateStudent';
import { DeleteOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
// import { Button } from '@mui/material';
// import AddStudent from './Component/AddStudent';
import { Image } from 'antd';
import get_list_request_signup from '@/app/api/get_list_request_signup';
import { Button } from '@mui/material';
const AdminManageStudents= ()=> {
    return (
        <Admin>
            <div style={{flex: "1 1 0", height: "100vh", overflow: "auto"}}>
                <StudentData />
            </div>
        </Admin>
    )
}   

function StudentData() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'first_name',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
            field: 'middle_name',
            headerName: 'Middle name',
            width: 150,
            editable: true,
          },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
            field: 'dob',
            headerName: 'DOB',
            width: 150,
            editable: true,
          },
          {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
          },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.first_name || ''} ${params.row.middle_name || ''} ${params.row.last_name || ''}`,
        },
        {
          field: 'avatar',
          headerName: 'Avatar',
          width: 150,
          editable: true,
          renderCell: (params)=> {
            return <Image alt={"Can't display"} src={params.row?.avatar} />
          }
        },
        {
            field: 'class_name',
            headerName: 'Class',
            width: 110,
            editable: true,
          },
          {
            headerName: 'Action',
            width: 200,
            editable: true,
            renderCell: (params)=> {
                return (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
                        {/* <UpdateStudent {...params.row} setChange={setChange} /> */}
                        <Button variant={"contained"} onClick={async ()=> {
                            const res= await axios({
                                url: "/api/v3/approve-request",
                                method: "post",
                                data: {
                                    ...params.row
                                }
                            })
                            const result= await res.data
                            if(result?.signup=== true) {
                                swal("Notice", "Signup successfully, account and password is sent to email's student", "success")
                                .then(()=> setChange(!change))
                            }
                            else {
                                swal("Notice", "Signup failed", "error")
                                
                            }
                            return result   
                        }}>Approved</Button>
                        <DeleteOutlined onClick={async ()=> {
                            swal("Notice", "Are you sure want to delete this student", {buttons: {
                                ok: "Confirm",
                                cancel: "Cancel"
                            }})
                            .then(async value=> {
                                if(value=== "ok") {
                                    const res= await fetch(`/api/v3/student/${params.row.id}`,{
                                        method: "DELETE",
                                        body: JSON.stringify({student_id: params.row.id}),
                                        headers: {
                                          "Content-Type": "application/json"
                                        }
                                    })
                                    const result= await res.json()
                                    if(result?.delete=== true) {
                                        swal("Notice", "Delete student successfully", "success")
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
                        }} style={{cursor: "pointer"}} title={"Delete student"}  />
                    </div>
                )
            }
          }
      ];
    const [data, setData]= React.useState([])
    const [change, setChange]= React.useState([])
    React.useEffect(()=> {
        (async ()=> {
        const result= await get_list_request_signup()
        return setData(result)
        })()
    }, [change])

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        {/* <AddStudent setChange={setChange} /> */}
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

export default AdminManageStudents