import { Box, TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from '@mui/material';
import { useTableHeadCells } from '../app/data/headCells';
import React from 'react';
const EnhancedTableHead = () => {
  const headCells = useTableHeadCells();

  return (
    <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontWeight: 'bold' }}
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default React.memo(EnhancedTableHead);
