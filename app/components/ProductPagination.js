import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ProductPagination({ paginationInfo, page, switchToPage, handleCurrentPageChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={paginationInfo && paginationInfo.totalPages}
        page={page}
        onChange={(e, value) => {
          handleCurrentPageChange(e, value);
          switchToPage(value);
        }}
      />
    </Stack>
  );
}
