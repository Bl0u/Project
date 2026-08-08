import { TableCell, TableRow } from "@mui/material";

export default function DashboardEmptyState() {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        align="center"
      >
        No users found.
      </TableCell>
    </TableRow>
  );
}