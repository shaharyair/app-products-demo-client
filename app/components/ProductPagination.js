import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// ProductPagination component for displaying pagination controls
export default function ProductPagination({ paginationInfo, page, switchToPage, handleCurrentPageChange }) {
  return (
    <Stack spacing={2}>
      {/* Pagination component */}
      <Pagination
        // Total number of pages based on the paginationInfo prop
        count={paginationInfo && paginationInfo.totalPages}
        // Current active page
        page={page}
        // Event handler for page change
        onChange={(e, value) => {
          // Handle the change of the current page
          handleCurrentPageChange(e, value);
          // Switch to the selected page
          switchToPage(value);
        }}
      />
    </Stack>
  );
}
