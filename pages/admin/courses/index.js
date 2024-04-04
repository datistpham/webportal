import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import Admin from '..';
import UpdateCourse from './Component/UpdateCourse';
import { DeleteOutlined } from '@ant-design/icons';
import AddCourse from './Component/AddCourse';
import delete_course from '@/app/api/admin/delete_course';
const AdminManageCourses= ()=> {
    return (
        <Admin>
            <div style={{flex: "1 1 0", height: "100vh", overflow: "auto"}}>
                <CourseData />
            </div>
        </Admin>
    )
}   


function CourseData() {
  const [change, setChange]= React.useState(false)
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'course_name',
          headerName: 'Course name',
          width: 150,
        },
        {
            field: 'course_description',
            headerName: 'Course description',
            width: 250,
          },
        {
          field: 'lesson_number',
          headerName: 'Number of lesson',
          width: 150,
        },
        {
            headerName: 'Action',
            width: 200,
            editable: true,
            renderCell: (params)=> {
                return (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
                        <UpdateCourse {...params.row} setChange={setChange} />
                        <DeleteOutlined onClick={async ()=> {
                            swal("Notice", "Are you sure want to delete this course", {buttons: {
                                ok: "Confirm",
                                cancel: "Cancel"
                            }})
                            .then(async value=> {
                                if(value=== "ok") {
                                    const result= await delete_course(params.row?.id)
                                    if(result?.delete=== true) {
                                        swal("Notice", "Delete course successfully", "success")
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
                        }} style={{cursor: "pointer"}} title={"Delete course"}  />
                    </div>
                )
            }
          }
      ];
    const [data, setData]= React.useState([])
    React.useEffect(()=> {
        (async ()=> {
        const res= await axios({
            url: "/api/v3/course",
            method: "get"
        })
        const result= await res.data
        return setData(result)
        })()
    }, [change])
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <AddCourse setChange={setChange} />
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

export default AdminManageCourses