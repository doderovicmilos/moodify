const modalContentStyles = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  borderRadius: 1,
  width: 375,
  padding: 3
};

const labelStyles = {
  cursor: 'init', 
  alignItems: 'start', 
  mt: 2, 
  div: { 
    width: '100%' 
  }, 
  input: { 
    padding: 1, 
    width: '100%' 
  }, 
  '.MuiSelect-select': { 
    padding: 1 
  } 
};

const outlinedInputSecondaryColorMixin = {
  '.MuiInputBase-root': { '& > fieldset': { borderColor: 'primary.main' } },
  '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error)': {
    '& > fieldset': {
      borderColor: 'primary.main'
    }
  },
  '& .MuiOutlinedInput-root:hover:not(.Mui-error)': {
    '& > fieldset': {
      borderColor: 'primary.main'
    }
  }
};

const submitButtonStyles = {mt: 3, mb: 2, mx: 2};

export { modalContentStyles, labelStyles, outlinedInputSecondaryColorMixin, submitButtonStyles };