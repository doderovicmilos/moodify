import { Modal, Box, FormGroup, FormControlLabel, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useMemo } from "react";
import { outlinedInputSecondaryColorMixin } from "./styles";
import { Mood } from "../../../../types";
import { useRecoilState } from "recoil";
import { playlistState } from "../../../../../pages/Playlist/store";




interface AddSongProps {
  handleClose: () => void;
}

export default function AddSong({handleClose}:AddSongProps):JSX.Element {
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

  const moods: Mood[] = ['happy', 'sad', 'energetic', 'relaxed'];

  const labelStyles = {cursor: 'init', alignItems: 'start', mt: 2, div: { width: '100%' }, input: { padding: 1, width: '100%' }, '.MuiSelect-select': { padding: 1 } };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          borderRadius: 1,
          width: 300,
          padding: 3
        }}>
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
                      {moods.map(el => (<MenuItem key={el} value={el}>{el}</MenuItem>))}
                    </TextField>
                  }
                />
              );
            }}
            name="mood"
            control={control}
          />
          <Button type="submit" sx={{mt: 3}}>Submit</Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  ); 
}