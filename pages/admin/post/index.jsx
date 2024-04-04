import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import Admin from '..';
import { DeleteOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import UpdatePost from './Component/UpdatePost';
import Image from 'next/image';
// import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
const AdminManagePost= ()=> {
    return (
        <Admin>
            <div style={{flex: "1 1 0", height: "100vh", overflow: "auto"}}>
                <PostData />
            </div>
        </Admin>
    )
}   

function PostData() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'image',
          headerName: 'Image post',
          width: 250,
          renderCell: (params)=> {
            return <div style={{width: "100%", position: "relative", height: 200}}>
                <Image fill src={params.row.image} alt={""} style={{width: "100%"}} />
            </div>
          }

        },
        {
          field: 'title',
          headerName: 'Title post',
          width: 150,
          editable: true,
        },
        {
            field: 'content',
            headerName: 'Content post',
            width: 150,
            editable: true,
          },
        {
          field: 'time_created',
          headerName: 'Time created',
          width: 150,
          editable: true,
        },
          {
            headerName: 'Action',
            width: 200,
            editable: true,
            renderCell: (params)=> {
                return (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
                        <Button variant={"contained"} onClick={()=> {
                          router.push("/admin/post/edit/"+ params.row.id)
                        }}>Update post</Button>
                        <DeleteOutlined onClick={async ()=> {
                            swal("Notice", "Are you sure want to delete this post", {buttons: {
                                ok: "Confirm",
                                cancel: "Cancel"
                            }})
                            .then(async value=> {
                                if(value=== "ok") {
                                    const res= await fetch(`/api/v3/post/${params.row.id}`,{
                                        method: "DELETE",
                                        body: JSON.stringify({post_id: params.row.id}),
                                        headers: {
                                          "Content-Type": "application/json"
                                        }
                                    })
                                    const result= await res.json()
                                    if(result?.delete=== true) {
                                        swal("Notice", "Delete post successfully", "success")
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
                        }} style={{cursor: "pointer"}} title={"Delete post"}  />
                    </div>
                )
            }
          }
      ];
    const [data, setData]= React.useState([])
    const [change, setChange]= React.useState([])
    const router= useRouter()
    React.useEffect(()=> {
        (async ()=> {
        const res= await axios({
            url: "/api/v3/post",
            method: "get"
        })
        const result= await res.data
        return setData(result)
        })()
    }, [change])

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Button variant={"contained"} onClick={()=> router.push("/admin/post/add")} type={"primary"}>Create post</Button>
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

export default AdminManagePost