import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm, Controller } from 'react-hook-form';
import { Modal, Box, FormGroup, FormControlLabel, TextField, Button, MenuItem, Typography } from "@mui/material";

import { moods } from "../../../../../shared/constants";
import { playlistState } from "../../../../../pages/Playlist/store";
import { modalContentStyles, labelStyles, outlinedInputSecondaryColorMixin } from "../../../../../shared/styles";
import { userSettingsState } from "../../store";

interface AddSongProps {
  handleClose: () => void;
}

export default function AddSong({handleClose}:AddSongProps):JSX.Element {
  const { moodLabels } = useRecoilValue(userSettingsState);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ mode: 'onChange', defaultValues: { title: "", artist: "", album: "", mood: "happy" } });
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const nextRank = useMemo(()=> playlist.playlist?.map(it => it.rank).reduce((a,b)=>(a > b) ? a : b) + 1, [playlist]);

  const submitHandler = (value:any) => {
    setPlaylist(prev => ({playlist: [...prev.playlist, {rank: nextRank, ...value}]}));
    handleClose();
  }

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalContentStyles}>
      <Typography variant="h5" sx={{m:2}}>Add Song</Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormGroup>
          <Controller
            render={({ field }) => {
              return (
                <FormControlLabel
                  label='Title'
                  labelPlacement="top"
                  sx={labelStyles}
                  control={
                    <TextField
                      {...field}
                      error={!!errors.title}
                      helperText={errors.title ? `${errors.title.message}` : ''}
                      sx={outlinedInputSecondaryColorMixin}
                    />
                  }
                />
              );
            }}
            name="title"
            control={control}
            rules={{
              required: { value: true, message: "Title required" },
            }}
          />
          <Controller
            render={({ field }) => {
              return (
                <FormControlLabel
                  label='Artist'
                  labelPlacement="top"
                  sx={labelStyles}
                  control={
                    <TextField
                      {...field}
                      error={!!errors.artist}
                      helperText={errors.artist ? `${errors.artist.message}` : ''}
                      sx={outlinedInputSecondaryColorMixin}
                    />
                  }
                />
              );
            }}
            name="artist"
            control={control}
            rules={{
              required: { value: true, message: "Artist required" },
            }}
          />
          <Controller
            render={({ field }) => {
              return (
                <FormControlLabel
                  label='Album'
                  labelPlacement="top"
                  sx={labelStyles}
                  control={
                    <TextField
                      {...field}
                      error={!!errors.album}
                      helperText={errors.album ? `${errors.album.message}` : ''}
                      sx={outlinedInputSecondaryColorMixin}
                    />
                  }
                />
              );
            }}
            name="album"
            control={control}
            rules={{
              required: { value: true, message: "Album required" },
            }}
          />
          <Controller
            render={({ field }) => {
              return (
                <FormControlLabel
                  label='Mood'
                  labelPlacement="top"
                  sx={labelStyles}
                  control={
                    <TextField
                      {...field}
                      select
                    >
                      {
                        moods.map(el => (
                          <MenuItem 
                            key={el} 
                            value={el}
                          >
                            {moodLabels[el].emoji}
                          </MenuItem>)
                        )
                      }
                    </TextField>
                  }
                />
              );
            }}
            name="mood"
            control={control}
          />
          <Button variant="contained" type="submit" sx={{mt: 3, mb: 2, mx: 2}}>Save</Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  ); 
}