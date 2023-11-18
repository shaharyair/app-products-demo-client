import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ProductOptionsBar({ fetchProductList, setOpenProductDetails, setProductById }) {
  const [searchText, setSearchText] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const handleSearchFieldChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSortQueryChange = (e) => {
    setSortQuery(e.target.value);
  };

  const handleSearchProduct = (searchText) => {
    fetchProductList(`?search=${searchText}`);
  };

  const sortQueriesArray = {
    sortDateAsc: "?sort=date",
    sortDateDesc: "?sort=date&order=desc",
    sortNameAsc: "?sort=name",
    sortNameDesc: "?sort=name&order=desc",
  };

  return (
    <>
      <main className='flex justify-start gap-4'>
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
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortQuery}
            label='Sort By'
            onChange={(e) => {
              handleSortQueryChange(e);
              fetchProductList(e.target.value);
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
