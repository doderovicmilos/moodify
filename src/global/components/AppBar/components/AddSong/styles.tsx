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

export { outlinedInputSecondaryColorMixin };