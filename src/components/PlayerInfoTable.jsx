import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import statOptions from '../utils/statOptions'; // Import statOptions

const PlayerInfoTable = ({ table, type }) => {
  const [order, setOrder] = React.useState('desc');
  let initialOrderBy = 'Season';
  if (type === 'Highs') {
    initialOrderBy = 'Game Highs: Season';
  }
  if (type === 'Playoffs') {
    initialOrderBy = 'Year';
  }
  const [orderBy, setOrderBy] = React.useState(initialOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = React.useMemo(() => {
    return table.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [order, orderBy, table]);

  // Helper function to get the label of the column from statOptions
  const getColumnLabel = (column) => {
    console.log(type)
    const statOption = statOptions[type].find(option => option.value === column);
    if (column.includes("Unnamed:")) return "";
    if (column.includes("Game Highs")) column = column.replace(new RegExp("Game Highs ", 'g'), '');
    console.log(statOption)
    return statOption ? statOption.label : column; // Return label if found, otherwise return the key
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Player Statistics
      </Typography>
      <Table size="small"> {/* Set the size to small to reduce padding */}
        <TableHead>
          <TableRow>
            {Object.keys(table[0] || {}).map((column) => (
              <TableCell
                key={column}
                sx={{ padding: '4px 8px',
                      textAlign: 'center',
                 }} 
              >
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? order : 'asc'}
                  onClick={() => handleRequestSort(column)}
                >
                  {getColumnLabel(column)} {/* Display the stat label */}
                  {orderBy === column ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {Object.keys(row).map((key) => (
                <TableCell
                  key={key}
                  sx={{ padding: '4px 8px' }} // Apply the same padding here to reduce spacing between rows
                >
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={table.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default PlayerInfoTable;
