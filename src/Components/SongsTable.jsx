import React from 'react';
import { Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import  EnhancedTableHead  from './EnhancedTableHead';
import { SongRow } from './SongRow';
import { DataGrid } from '@mui/x-data-grid';
const SongsTable = ({
  visibleRows,
  order,
  orderBy,
  onRequestSort,
  onUserClick,
}) => {
  return (
    <>
      <TableContainer sx={{ overflowY: 'scroll', maxHeight: '80vh'  }}>
        <Table sx={{ minWidth: '60%' }} aria-labelledby="tableTitle" size={'medium'}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            rowCount={visibleRows.length}
          />
          <TableBody sx={{ overflowY: 'scroll', maxHeight: '30vh', padding:'20px' }}>
            {visibleRows.map((row) => {
              return <SongRow key={row.id} row={row} onUserClick={onUserClick} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};


export default React.memo(SongsTable);
