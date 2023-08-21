import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AppBar as MuiAppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { Mood } from '../../../../../shared/types';
import { moods } from '../../../../../shared/constants';
import { dashboardUIState, userSettingsState } from '../../store';
import { addSongTypographyStyles, playlistTypographyStyles } from './styles';


export default function AppBar():JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const setDashboardUI = useSetRecoilState(dashboardUIState);
  const [{ mood, moodLabels }, setUserSettings] = useRecoilState(userSettingsState);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (mood?:Mood) => {
    if(mood) setUserSettings(prev=>({ ...prev, mood }));
    setAnchorEl(null);
  };

  const toggleAddSong = () => {
    setDashboardUI(prev=>({...prev, isAddSongActive: !prev.isAddSongActive}))
  }

  const toggleEditMood = () => {
    setDashboardUI(prev=>({...prev, isEditMoodActive: !prev.isEditMoodActive}))
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={playlistTypographyStyles}>
              <NavLink to="/">
                Playlist
              </NavLink>
            </Typography>
            <Typography variant="h6" component="div" sx={addSongTypographyStyles} onClick={toggleAddSong}>
              Add song
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleEditMood}
            >
              <SettingsSuggestIcon />
            </IconButton>
            <div>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {moodLabels[mood].emoji}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClick()}
              >
                { 
                  moods.map(el=> (
                    <MenuItem 
                      key={el} 
                      onClick={() => handleMenuClick(el)}
                    >
                        {moodLabels[el].emoji}
                    </MenuItem>
                  )
                  )
                }
              </Menu>
            </div>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}