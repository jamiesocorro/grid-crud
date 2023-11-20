import { Box, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface SearchComponentProps {
  onChange: (value: string) => void;
}

export const SearchComponent: FC<SearchComponentProps> = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onChange(newSearchTerm);
  };

  return (
    <Box>
      <TextField
        sx={{ padding: "10px" }}
        id="searchUserId"
        value={searchTerm}
        onChange={onHandleChange}
        placeholder="Search user id"
      />
    </Box>
  );
};
