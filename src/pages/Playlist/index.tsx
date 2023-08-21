import React, { useMemo } from "react";
import { useRecoilValue, useRecoilState } from 'recoil';

import { playlistState } from "./store";
import { TableContainer, Paper, Table as MuiTable, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { rowStyles } from "./styles";
import { userSettingsState } from "../../global/components/Dashboard/store";

export default function SongList(): JSX.Element {
  const { mood } = useRecoilValue(userSettingsState);
  const [{ playlist }, setPlaylist] = useRecoilState(playlistState);

  const filteredPlaylist = useMemo(() => 
    playlist.filter(el => el.mood === mood), 
  [playlist, mood]);

  const deleteClickHandler = (rank:number) => {
    setPlaylist(prev => (
      {
        playlist: prev.playlist.filter(el=>el.rank!==rank)
      }
    ));
  }

  return (<>
    <TableContainer 
      component={Paper} 
      sx={{
        
      }}
      >
      <MuiTable aria-label="simple table" size={'medium'} stickyHeader>
        <TableHead >
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Album</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>  
        <TableBody>
          {
            filteredPlaylist.map(it  =>  
              (
                <TableRow key={it.rank} sx={rowStyles}>
                  <TableCell>{it.title}</TableCell>
                  <TableCell>{it.artist}</TableCell>
                  <TableCell>{it.album}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => { deleteClickHandler(it.rank) }}
                    >
                      <CloseIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )
          }
        </TableBody>
      </MuiTable>
    </TableContainer>
  </>);
}