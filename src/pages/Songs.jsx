import { useEffect, useMemo, useState, useCallback } from 'react';
import { Box, Paper, CircularProgress, Alert, TablePagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EnhancedTableToolbar } from '../Components/EnhancedTableToolbar';
import SongsTable from '../Components/SongsTable';
import { useGetSongsQuery } from '../services/songsApi';
import { setSongs } from '../slices/songsSlice';
import SongsGallery from '../Components/SongsGallery';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Songs() {
  const [viewMode, setViewMode] = useState('table');
  const [seed, setSeed] = useState('');
  const [language, setLanguage] = useState('');
  const [likes, setLikes] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { t } = useTranslation();

  const {
    data: songs = [],
    isLoading,
    error,
    refetch,
  } = useGetSongsQuery({
    seed: seed,
    lg: language,
    likes: likes,
    page: page + 1,
    count: rowsPerPage,
  });

  const dispatch = useDispatch();
  const [allSongs, setAllSongs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (viewMode === 'gallery' && songs.length > 0) {
      setAllSongs((prev) => {
        const newSongs = songs.filter(
          (newSong) => !prev.some((existingSong) => existingSong.id === newSong.id),
        );
        return [...prev, ...newSongs];
      });

      if (songs.length < rowsPerPage) {
        setHasMore(false);
      }
    }
  }, [songs, rowsPerPage, viewMode]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore && viewMode === 'gallery') {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore, viewMode]);

  useEffect(() => {
    setAllSongs([]);
    setPage(0);
    setHasMore(true);
  }, [seed, language, likes]);

  const tableRows = useMemo(() => {
    return songs.map((song, index) => ({
      index: index + 1 + page * rowsPerPage,
      id: song.id,
      Name: song.title,
      Artist: song.artist,
      Album: song.album,
      Likes: song.likes,
      Genre: song.genre,
      Text: song.text,
      coverImage: song.coverImage,
      audioData: song.audioData,
    }));
  }, [songs, page, rowsPerPage]);

  const galleryRows = useMemo(() => {
    return allSongs.map((song, index) => ({
      index: index + 1,
      id: song.id,
      Name: song.title,
      Artist: song.artist,
      Album: song.album,
      Likes: song.likes,
      Genre: song.genre,
      coverImage: song.coverImage,
      audioData: song.audioData,
    }));
  }, [allSongs]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, seed, language, likes, refetch]);

  const handleSeedChange = useCallback((value) => {
    setSeed(value);
  }, []);

  const handleLanguageChange = useCallback((value) => {
    setLanguage(value);
  }, []);

  const handleLikesChange = useCallback((value) => {
    setLikes(value);
  }, []);

  useEffect(() => {
    const dataToDispatch = viewMode === 'table' ? songs : allSongs;
    if (dataToDispatch.length > 0) {
      dispatch(setSongs(dataToDispatch));
    }
  }, [songs, allSongs, viewMode, dispatch]);

  useEffect(() => {
    if (viewMode === 'table') {
      setPage(0);
    }
  }, [viewMode]);

  if (isLoading && (viewMode === 'table' ? songs.length === 0 : allSongs.length === 0)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100vw"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Ошибка при загрузке песен: {'status' in error ? error.status : 'Unknown error'}
      </Alert>
    );
  }

  return (
    <div style={{ width: '100vw' }}>
      <Box sx={{ width: '90vw', m: 'auto' }}>
        <Paper sx={{ mb: 2 }}>
          <EnhancedTableToolbar
            handleSeedChange={handleSeedChange}
            handleLanguageChange={handleLanguageChange}
            handleLikesChange={handleLikesChange}
            onViewModeChange={setViewMode}
          />

          {viewMode === 'table' ? (
            <>
              <SongsTable visibleRows={tableRows} />
              <TablePagination
                component="div"
                count={-1}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage={t('Lines per page')}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${t('out of')} ${count !== -1 ? count : `${t('more')} ${to}`}`
                }
              />
            </>
          ) : (
            <SongsGallery
              songs={galleryRows}
              fetchMoreData={fetchMoreData}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
}
