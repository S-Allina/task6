import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component'; // Импортируем компонент
import Player from './Player';
import { useTranslation } from 'react-i18next';

export default function SongsGallery({ songs, fetchMoreData, hasMore, isLoading }) {
  const { t } = useTranslation();

  return (
    // ✅ ИСПРАВЛЕНО: Добавлен id для scrollableTarget
    <Box
      id="scrollableDiv"
      sx={{
        flexGrow: 1,
        p: 2,
        overflowY: 'auto',
        maxHeight: '80vh',
        margin: '0 auto',
        // Убедимся, что контейнер действительно скроллится
        height: '80vh',
      }}
    >
      {/* ✅ ИСПРАВЛЕНО: InfiniteScroll с правильными параметрами */}
      <InfiniteScroll
        dataLength={songs.length} // Количество уже загруженных элементов
        next={fetchMoreData} // Функция для загрузки следующих данных
        hasMore={hasMore} // Флаг, указывающий, есть ли еще данные для загрузки
        loader={
          // Показываем лоадер только если есть еще данные
          hasMore && (
            <Box display="flex" justifyContent="center" sx={{ py: 2 }}>
              <CircularProgress />
            </Box>
          )
        }
        endMessage={
          songs.length > 0 && (
            <Box sx={{ textAlign: 'center', marginTop: '20px', padding: '20px' }}>
              <Typography variant="body1" color="text.secondary">
                <b>{t('no_more_songs')}</b>
              </Typography>
            </Box>
          )
        }
        scrollableTarget="scrollableDiv" // ID прокручиваемого контейнера
        // ✅ Дополнительные улучшения для лучшей работы
        style={{
          overflow: 'visible', // Важно для корректного отображения Grid
        }}
      >
        <Grid container spacing={3}>
          {songs.map((song) => (
            <Grid
              item
              key={song.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                width: '100%',
                '@media (min-width: 600px)': { width: '50%' },
                '@media (min-width: 960px)': { width: '33.333%' },
                '@media (min-width: 1280px)': { width: '23%' },
              }}
            >
              <Card
                sx={{
                  maxWidth: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={song.coverImage}
                  alt={song.Name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, height: 'auto' }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    fontSize="1rem"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {song.Name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {t('artist')}: {song.Artist}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('album')}: {song.Album}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('Likes')}: {song.Likes}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Player audioData={song.audioData} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ✅ Сообщение, если нет песен */}
        {songs.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', padding: '40px' }}>
            <Typography variant="h6" color="text.secondary">
              {t('no_songs_found')}
            </Typography>
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  );
}
