import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// ProductOptionsBar component for displaying search and sorting options
export default function ProductOptionsBar({
  fetchProductList,
  handleSearchProduct,
  setOpenProductDetails,
  setProductById,
  currentPage,
  setSortBy,
  sortBy,
}) {
  // State for the search text input
  const [searchText, setSearchText] = useState("");

  // Function to handle changes in the search text field
  const handleSearchFieldChange = (e) => {
    setSearchText(e.target.value);
  };

  // Function to handle changes in the sort query dropdown
  const handleSortQueryChange = (e) => {
    setSortBy(e.target.value);
  };

  const selectOptions = [
    { label: "None", value: "none" },
    { label: "Oldest to Newest", value: "date" },
    { label: "Newest to Oldest", value: "-date" },
    { label: "Name (A - Z)", value: "name" },
    { label: "Name (Z - A)", value: "-name" },
  ];

  return (
    <>
      {/* Container for search and sorting options */}
      <main className='flex justify-start gap-4'>
        {/* Button to add a new product */}
        <Button
          className='bg-blue-500 text-xs md:text-sm'
          variant='contained'
          value={searchText}
          onClick={() => {
            setProductById(null);
            setOpenProductDetails(true);
          }}
        >
          Add Product
        </Button>
        {/* Text field for entering search text */}
        <TextField
          variant='outlined'
          value={searchText}
          onChange={(e) => {
            handleSearchFieldChange(e);
            handleSearchProduct(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Dropdown for selecting sorting options */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label='Sort By'
            onChange={(e) => {
              handleSortQueryChange(e);
              fetchProductList(currentPage, e.target.value);
            }}
          >
            {selectOptions.map((option) => (
              <MenuItem key={`Selection: ${option.label}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </main>
    </>
  );
}
