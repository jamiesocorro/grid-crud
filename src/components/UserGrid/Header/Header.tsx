import { Box, Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { FC, useState } from "react";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { UserModal } from "../../shared/UserModal/UserModal";
import { UserModel } from "../../../models/UserModel";
import { deleteUser } from "../../../services/User/userService";
import Divider from "@mui/material/Divider";
import { SearchComponent } from "./Search/Search";

interface EditToolbarProps {
  users: UserModel[];
  setUsers: any;
  selectedUsers: UserModel[];
  setSelectedUsers: any;
  originalUsers: UserModel[];
  setOriginalUsers: any;
}

export const EditToolbar: FC<EditToolbarProps> = ({
  users,
  setUsers,
  selectedUsers,
  setSelectedUsers,
  originalUsers,
  setOriginalUsers,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchUserId, setSearchUserId] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserModel>();

  const onHandleAdd = () => {
    setSelectedUser({
      id: 0,
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      createdOn: new Date(),
    });
    setIsOpen(!isOpen);
  };

  const onHandleUpdate = () => {
    setSelectedUser(selectedUsers[0]);
    setIsOpen(!isOpen);
    setUsers(users);
  };

  const onHandleDelete = () => {
    const newRows = users.filter((user) => !selectedUsers.includes(user));
    setUsers(newRows);
    deleteUser(newRows);
    setSelectedUsers([]);
  };

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSearch = debounce((userId: string) => {
    setUsers(
      originalUsers.filter((r) =>
        r.userId.toLowerCase().includes(userId.toLocaleLowerCase())
      )
    );
  }, 1000);

  const onHandleSearch = (userId: string) => {
    setSearchUserId(userId);
    debouncedSearch(userId);
  };

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        background: "#414d59 !important",
      }}
    >
      <Box>
        <Button
          color="primary"
          sx={{
            "&.Mui-disabled  .MuiSvgIcon-root": {
              color: "#74818D",
            },
          }}
          startIcon={
            <NoteAddIcon
              sx={{ color: "#A8B5C2", fontSize: "40px !important" }}
            />
          }
          onClick={onHandleAdd}
          disabled={selectedUsers.length > 0}
        ></Button>
      </Box>

      <Divider
        orientation="vertical"
        variant="middle"
        sx={{ bgcolor: "white", height: "20px" }}
      />
      <Box>
        <Button
          color="primary"
          sx={{
            "&.Mui-disabled  .MuiSvgIcon-root": {
              color: "#74818D",
            },
          }}
          startIcon={
            <EditNoteIcon
              sx={{ color: "#A8B5C2", fontSize: "40px !important" }}
            />
          }
          onClick={onHandleUpdate}
          disabled={selectedUsers.length !== 1}
        ></Button>
      </Box>
      <Divider
        orientation="vertical"
        variant="middle"
        sx={{ bgcolor: "white", height: "20px" }}
      />
      <Box>
        <Button
          color="primary"
          sx={{
            "&.Mui-disabled  .MuiSvgIcon-root": {
              color: "#74818D",
            },
          }}
          startIcon={
            <DeleteIcon
              sx={{ color: "#A8B5C2", fontSize: "40px !important" }}
            />
          }
          onClick={onHandleDelete}
          disabled={selectedUsers.length === 0}
        ></Button>
      </Box>
      <Divider
        orientation="vertical"
        variant="middle"
        sx={{ bgcolor: "white", height: "20px" }}
      />
      <Box>
        <SearchComponent onChange={onHandleSearch}></SearchComponent>
      </Box>
      <UserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setOriginalUsers={setOriginalUsers}
      ></UserModal>
    </GridToolbarContainer>
  );
};
