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
  setOpenProductDetails,
  setProductById,
  currentPage,
  setSortQuery,
  sortQuery,
}) {
  // State for the search text input
  const [searchText, setSearchText] = useState("");

  // Function to handle changes in the search text field
  const handleSearchFieldChange = (e) => {
    setSearchText(e.target.value);
  };

  // Function to handle changes in the sort query dropdown
  const handleSortQueryChange = (e) => {
    setSortQuery(e.target.value);
  };

  // Function to fetch products based on the search text
  const handleSearchProduct = (searchText) => {
    fetchProductList(`?search=${searchText}`);
  };

  // Object containing sort queries for easy reference
  const sortQueriesArray = {
    sortDateAsc: "?sort=date",
    sortDateDesc: "?sort=date&order=desc",
    sortNameAsc: "?sort=name",
    sortNameDesc: "?sort=name&order=desc",
  };

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
            value={sortQuery}
            label='Sort By'
            onChange={(e) => {
              handleSortQueryChange(e);
              fetchProductList(`?page=${currentPage}`, e.target.value);
            }}
          >
            <MenuItem value={sortQueriesArray.sortDateAsc}>Oldest to Newest</MenuItem>
            <MenuItem value={sortQueriesArray.sortDateDesc}>Newest to Oldest</MenuItem>
            <MenuItem value={sortQueriesArray.sortNameAsc}>Name (A - Z)</MenuItem>
            <MenuItem value={sortQueriesArray.sortNameDesc}>Name (Z - A)</MenuItem>
          </Select>
        </FormControl>
      </main>
    </>
  );
}
