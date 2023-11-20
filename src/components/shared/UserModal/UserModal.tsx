import {
  Box,
  Button,
  Dialog,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { createUser, updateUser } from "../../../service/User/userService";
import { UserModel } from "../../../models/UserModel";
import Select from "@mui/material/Select";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  users: UserModel[];
  setUsers: any;
  selectedUser?: UserModel;
}

export const UserModal: FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  users,
  setUsers,
  selectedUser,
}) => {
  const [error, setError] = useState(false);

  const onHandleClose = () => setIsOpen(!isOpen);

  const [id, setId] = useState<number>();
  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const onHandleAdd = () => {
    const row = {
      id: users.length ? users.length + 1 : 1,
      userId,
      firstName,
      lastName,
      email,
      status,
      createdOn: new Date(),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setError(true);
      return;
    }

    const newRows = Object.assign([], users);
    newRows.push(row);

    createUser(newRows);
    setUsers(newRows);
    onHandleClose();
  };

  const onHandleUpdate = () => {
    const row = {
      id: id,
      userId,
      firstName,
      lastName,
      email,
      status,
      createdOn: new Date(),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setError(true);
      return;
    }

    const newRows = users.map((r) => {
      if (r.id === row.id) {
        r.userId = row.userId;
        r.firstName = row.firstName;
        r.lastName = row.lastName;
        r.email = row.email;
        r.status = row.status;
        r.createdOn = new Date();
      }
      return r;
    });

    updateUser(newRows);
    setUsers(newRows);
    onHandleClose();
  };

  useEffect(() => {
    setId(selectedUser?.id || 0);
    setUserId(selectedUser?.userId || "");
    setFirstName(selectedUser?.firstName || "");
    setLastName(selectedUser?.lastName || "");
    setEmail(selectedUser?.email || "");
    setStatus(selectedUser?.status || "");
  }, [selectedUser]);

  return (
    <Dialog open={isOpen} onClose={onHandleClose}>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {selectedUser && selectedUser.id > 0 ? "Edit user" : "Add user"}
        </Box>
        <Box>
          <TextField
            id="userId"
            label="User ID"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ marginRight: "20px" }}>
            <TextField
              id="firstName"
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              id="lastName"
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        </Box>

        <Box>
          <TextField
            id="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            helperText={error ? "Invalid email address" : ""}
          />
        </Box>

        <Box>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            id="status"
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Initiated"}>Initiated</MenuItem>
            <MenuItem value={"Registered"}>Registered</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => onHandleClose()}>Cancel</Button>
          {selectedUser && selectedUser.id > 0 ? (
            <Button onClick={onHandleUpdate}>Update User</Button>
          ) : (
            <Button onClick={onHandleAdd}>Create User</Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
