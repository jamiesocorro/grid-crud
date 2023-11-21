import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { EditToolbar } from "./Header/Header";
import { viewUsers } from "../../services/User/userService";
import { UserModel } from "../../models/UserModel";
import moment from "moment";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderLeft: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
    backgroundColor: "#36404A",
    color: "#A8B5C2",
    borderColor: "#5D6F81",
  },
  "& .hideRightSeparator > .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-cell": {
    backgroundColor: "#36404A",
  },
  "& .MuiCheckbox-root svg": {
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    borderRadius: 2,
  },
  "& .MuiCheckbox-root svg path": {
    border: "none",
  },
  "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
    background: "none",
  },
  "& .MuiDataGrid-withBorderColor": {
    borderColor: "#5D6F81 !important",
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    minHeight: "50px !important",
    backgroundColor: "#36404A",
  },
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "userId", headerName: "User ID", flex: 1 },
  { field: "firstName", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    valueFormatter: (params) =>
      moment.utc(params?.value).format("ddd MMM DD YYYY hh:mm:ss GMT"),
  },
];

export const UserGrid = () => {
  const [users, setUsers] = React.useState(Array<UserModel>);
  const [selectedUsers, setSelectedUsers] = React.useState(Array<UserModel>);
  const [originalUsers, setOriginalUsers] = React.useState(Array<UserModel>);
  React.useEffect(() => {
    setUsers(viewUsers());
    setOriginalUsers(viewUsers());
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <StyledDataGrid
            keepNonExistentRowsSelected
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            columns={columns}
            rows={users}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: {
                users,
                setUsers,
                selectedUsers,
                setSelectedUsers,
                originalUsers,
                setOriginalUsers,
              },
            }}
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedUsers = users.filter((user) =>
                selectedIDs.has(user.id)
              );

              setSelectedUsers(selectedUsers);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
