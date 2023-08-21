import { Modal, Box, FormGroup, FormControlLabel, TextField, Button, MenuItem, Typography } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import { useForm, Controller } from 'react-hook-form';

import { moods } from "../../../../../shared/constants";
import {  modalContentStyles, labelStyles, outlinedInputSecondaryColorMixin } from "../../../../../shared/styles";
import { useRecoilState } from "recoil";
import { userSettingsState } from "../../../../store";
import { Mood } from "../../../../../shared/types";


interface AddSongProps {
  handleClose: () => void;
}

export default function EditMood({handleClose}:AddSongProps):JSX.Element {
  const [{ moodLabels }, setUserSettings] = useRecoilState(userSettingsState);
  const {
    setValue,
    getValues,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors }
  } = useForm({ mode: 'onChange', defaultValues: { label: "", mood: "happy" } });


  const submitHandler = (value:any) => {
    const { label, mood } = value;

    setUserSettings(prev => (
      {
        ...prev, moodLabels: 
          { ...prev.moodLabels, [mood as Mood]: 
            { ...prev.moodLabels[mood as Mood], emoji: label } 
          } 
      }
    ));
  }

  const handleEmojiClick = (e:any) => {
    const { label } =  getValues();
    setValue("label",  label + e.emoji);
    clearErrors();
  }

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{...modalContentStyles, width: 375}}>
      <Typography variant="h5" sx={{m:2}}>Edit Mood Label</Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormGroup sx={{ ".EmojiPickerReact": { mt: 3, ml: 2} }}>
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
                      error={!!errors.label}
                      helperText={errors.label ? `${errors.label.message}` : ''}
                      sx={outlinedInputSecondaryColorMixin}
                    />
                  }
                />
              );
            }}
            name="label"
            control={control}
            rules={{
              required: { value: true, message: "Label required" },
            }}
          />
          <EmojiPicker 
            height={340} 
            width={340} 
            searchDisabled  
            skinTonesDisabled
            onEmojiClick={handleEmojiClick}
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
                            {moodLabels[el].plain}
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
          <Button type="submit" sx={{mt: 3}}>Submit</Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  ); 
}