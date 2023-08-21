import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { userSettingsState } from '../../store';
import AddSong from './components/AddSong';
import EditMood from './components/EditMoodDisplay';
import { Mood } from '../../../shared/types';
import { moods } from '../../../shared/constants';


export default function AppBar():JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAddSongOpen, setIsAddSongOpen] = useState<boolean>(false);
  const [isEditMoodOpen, setIsEditMoodOpen] = useState<boolean>(false);
  const [{ mood, moodLabels }, setUserSettings] = useRecoilState(userSettingsState);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (mood?:Mood) => {
    if(mood) setUserSettings(prev=>({ ...prev, mood }));
    setAnchorEl(null);
  };

  const toggleAddSong = () => {
    setIsAddSongOpen(prev => !prev);
  }

  const toggleEditMood = () => {
    setIsEditMoodOpen(prev => !prev);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <MuiAppBar position="static">
          <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
                  Playlist
                </NavLink>
              </Typography>
              <Typography variant="h6" component="div" sx={{ mr: 4, cursor: "pointer" }} onClick={toggleAddSong}>
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
      {isAddSongOpen && <AddSong handleClose={toggleAddSong} />}
      {isEditMoodOpen && <EditMood handleClose={toggleEditMood} />}
    </>
  );
}