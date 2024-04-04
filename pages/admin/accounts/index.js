import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import Admin from "..";
import UpdateAccount from "./Component/UpdateAccount";
import { DeleteOutlined } from "@ant-design/icons";
const AdminManageAccount = () => {
  return (
    <Admin>
      <div style={{ flex: "1 1 0", height: "100vh", overflow: "auto" }}>
        <AccountData />
      </div>
    </Admin>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "account",
    headerName: "Account",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    renderCell: (params) => {
      if (params.row.role === 0) {
        return "Student";
      }
      if (params.row.role === 1) {
        return "Teacher";
      }
      if (params.row.role === 2) {
        return "Admin";
      }
    },
  },

  ,
  {
    headerName: "Action",
    width: 200,
    editable: true,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* <UpdateAccount {...params.row} /> */}
          <DeleteOutlined
            onClick={async () => {
              swal("Notice", "Are you sure want to delete this account", {
                buttons: {
                  ok: "Confirm",
                  cancel: "Cancel",
                },
              }).then(async (value) => {
                if (value === "ok") {
                  const res = await fetch("/api/v3/account", {
                    method: "delete",
                    body: JSON.stringify({ account_id: params.row.id }),
                  });
                  const result = await res.json();
                  if (result?.delete === true) {
                    swal(
                      "Notice",
                      "Delete account successfully",
                      "success"
                    ).then(() => setChange((prev) => !prev));
                  } else {
                    swal("Notice", "Error unexpected", "error");
                  }
                } else {
                  return null;
                }
              });
            }}
            style={{ cursor: "pointer" }}
            title={"Delete account"}
          />
        </div>
      );
    },
  },
];

function AccountData() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await axios({
        url: "/api/v3/account",
        method: "get",
      });
      const result = await res.data;
      return setData(result);
    })();
  }, []);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
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

export default AdminManageAccount;
