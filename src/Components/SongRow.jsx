import React from 'react';
import { TableRow, TableCell, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Collapse, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Player from './Player';
import { useTranslation } from 'react-i18next';

export const SongRow = ({ row, isItemSelected, onUserClick }) => {
   const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    onUserClick(event, row.id);
  };

  const handleToggle = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };
  console.log('row', row);
  return (
    <>
      <TableRow
        hover
        onClick={handleClick}
        role="number"
        aria-checked={isItemSelected}
        tabIndex={-1}
        align='center'
        selected={isItemSelected}
        sx={{ cursor: 'pointer', maxHeight: '30px', padding:'20px'  }}
      >
        {/* Добавляем ячейку со стрелкой */}
        <TableCell sx={{p:1, align:'left'}}>
          <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell sx={{p:1, align:'left'}}>{row.index}</TableCell>
        <TableCell sx={{p:1, align:'left'}} component="th" id={row.index} scope="row" padding="none">
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              {row.Name}
            </Typography>
        </TableCell>
        <TableCell sx={{p:1}} align="left">{row.Artist}</TableCell>
        <TableCell sx={{p:1}} align="left">{row.Album}</TableCell>
        <TableCell sx={{p:1}} align="left">{row.Genre}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{p:1}} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ display: 'flex', width: '100%', alignItems: 'start' }}
          >
            <Box sx={{ margin: 1, display: 'flex', alignItems: 'start' }}>
              <div>
                <img
                  src={row.coverImage}
                  alt={`Обложка ${row.Name}`}
                  style={{
                    width: 300,
                    height: 300,
                    objectFit: 'cover',
                    marginRight: 16,
                    borderRadius: 4,
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: '#549cec',
                    borderRadius: '30px',
                    width: '100px',
                    padding: '5px 10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                  }}
                >
                  <ThumbUpIcon sx={{ fill: 'white' }} />{' '}
                  <Typography sx={{ color: 'white', fontWeight: '700' }}>{row.Likes}</Typography>
                </Box>
              </div>
              <Box sx={{ width: '100%', padding: '0rem 2rem' }}>
                
                <Player audioData={row.audioData} />
                <Typography variant="h6" gutterBottom fontWeight="700">
                  {t("Text song")}
                </Typography>
                <Box sx={{width:'100%', maxHeight:'30vh', overflowY:'scroll'}}>
                   <Typography 
  gutterBottom
  component="div"
  dangerouslySetInnerHTML={{
    __html: row.Text.replace(/\n/g, '<br />')
  }}
>
                </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
