import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { Mood } from '../../types';

import { userSettingsState } from '../../store';
import AddSong from './components/AddSong';




export default function AppBar():JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const setUserSettings = useSetRecoilState(userSettingsState);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (mood?:Mood) => {
    if(mood) setUserSettings({ mood });
    setAnchorEl(null);
  };

  const moods: Mood[] = ['happy', 'sad', 'energetic', 'relaxed'];

  const handleAddSongClick = () => {
    setIsAdd(true);
  }

  const handleClose = () => {
    setIsAdd(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
              <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Playlist
              </NavLink>
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 4, cursor: "pointer" }} onClick={handleAddSongClick}>
              Add song
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <NavLink to="/settings" style={{ textDecoration: 'none', color: 'white' }}>
                <SettingsSuggestIcon />
              </NavLink>
            </IconButton>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                      onClick={() => handleMenuClick(el)}>
                        {el}
                     </MenuItem>
                   )
                  )
                }
              </Menu>
            </div>
        </Toolbar>
      </MuiAppBar>
      {isAdd && <AddSong handleClose={handleClose} />}
    </Box>
  );
}