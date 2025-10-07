import Toolbar from '@mui/material/Toolbar';
import { useState,useCallback,useRef, useEffect } from 'react';
import { Tooltip, InputLabel, Select, MenuItem, Slider, Switch } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Box,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export function EnhancedTableToolbar(props) {
   const generateRandomSeed = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const { t, i18n } = useTranslation();
  const { handleSeedChange, handleLanguageChange, handleLikesChange } = props;
  const [alertError, setAlertError] = useState('');
  const [seedValue, setSeedValue] = useState(generateRandomSeed());
  const [language, setLanguage] = useState('');
  const [likes, setLikes] = useState(0);
  const [viewMode, setViewMode] = useState('table');

  const debounceRef = useRef(null);

  const handleLikesSelect = useCallback((event, value) => {
    setLikes(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (handleLikesChange) {
        handleLikesChange(value.toString());
      }
    }, 500); 
  }, [handleLikesChange]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleLanguageSelect = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    i18n.changeLanguage(selectedLanguage);

    if (handleLanguageChange) {
      handleLanguageChange(selectedLanguage);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (props.onViewModeChange) {
      props.onViewModeChange(mode);
    }
  };

  const handleSeedSelect = (event) => {
    const value = event.target.value;
    setSeedValue(value);
    if (handleSeedChange) {
      handleSeedChange(value);
    }
  };

  const handleShuffleClick = () => {
    const newSeed = generateRandomSeed();
    setSeedValue(newSeed);
    if (handleSeedChange) {
      handleSeedChange(newSeed);
    }
  };


  return (
    <>
      {alertError && (
        <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setAlertError(null)}>
          {alertError}
        </Alert>
      )}
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxHeight: '20%',
            mt:'15px',
            width: '100%',
            boxSizing: 'border-box',
            flexWrap: 'no-wrap',
          },
        ]}
      >
        <Tooltip sx={{ mr: 0.625, minWidth: '50vw', fontSize: '0.6rem', alignSelf: 'stretch' }}>
          <InputLabel id="language-select-label" sx={{ minWidth: '10vw' }}>
            {t('Language')}
          </InputLabel>
          <Select
            sx={{ minWidth: '100%' }}
            labelId="language-select-label"
            id="language-select"
            value={language}
            label="language"
            onChange={handleLanguageSelect}
          >
            <MenuItem value="ru">{t('Russian')}</MenuItem>
            <MenuItem value="en">{t('English')}</MenuItem>
          </Select>
        </Tooltip>

        <Tooltip title="Select likes count" sx={{ alignSelf: 'stretch' }}>
          <Box sx={{ minWidth: '20%', px: 2 }}>
            <InputLabel id="likes-slider-label" sx={{ fontSize: '0.75rem' }}>
              {t('Likes')}
            </InputLabel>
            <Slider
              sx={{ width: '100%' }}
              aria-label="Likes"
              value={likes}
              onChange={handleLikesSelect}
              step={0.1}
              marks
              min={0.1}
              max={10}
              valueLabelDisplay="auto"
            />
          </Box>
        </Tooltip>

        <Tooltip title="Enter seed" sx={{ alignSelf: 'stretch' }}>
          <FormControl
            sx={{
              m: 0,
              maxHeight: '35px',
              width: '20%',
              position: 'relative',
              right: 0,
              padding: 0,
            }}
            variant="outlined"
          >
            <OutlinedInput
              sx={{
                m: 0,
                maxHeight: '35px',
                '& .MuiOutlinedInput-input': {
                  padding: '8px',
                  height: '35px',
                  boxSizing: 'border-box',
                },
              }}
              id="seed-input"
              onChange={handleSeedSelect}
              value={seedValue}
              placeholder={t('Enter seed...')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="shuffle seed"
                    edge="end"
                    size="small"
                    onClick={handleShuffleClick} 
                  >
                    <ShuffleIcon />
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="seed-helper-text"
              inputProps={{
                'aria-label': 'seed',
              }}
            />
          </FormControl>
        </Tooltip>
        <Tooltip title="Enter seed" sx={{ alignSelf: 'stretch' }}>
          <FormControl
            sx={{
              m: 0,
              maxHeight: '35px',
              width: '20%',
              position: 'relative',
              right: 0,
              padding: 0,
            }}
            variant="outlined"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={viewMode === 'gallery'}
                  onChange={(event) =>
                    handleViewModeChange(event.target.checked ? 'gallery' : 'table')
                  }
                  name="viewMode"
                />
              }
              label={viewMode === 'gallery' ? t('Gallery') : t('Table')}
            />
          </FormControl>
        </Tooltip>
      </Toolbar>
    </>
  );
}
