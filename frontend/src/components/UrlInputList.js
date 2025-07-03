import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Paper, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { isValidUrl, isValidValidity, isValidShortcode } from '../utils/validation';

const emptyInput = { url: '', validity: '', shortcode: '', error: '' };

// Enhanced, original input list for URL shortener
export default function UrlInputList({ onSubmit }) {
  const [inputs, setInputs] = useState([ { ...emptyInput } ]);

  const handleChange = (idx, field, value) => {
    const newInputs = inputs.map((input, i) => i === idx ? { ...input, [field]: value, error: '' } : input);
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) setInputs([...inputs, { ...emptyInput }]);
  };

  const removeInput = idx => {
    setInputs(inputs.filter((_, i) => i !== idx));
  };

  const validate = input => {
    if (!isValidUrl(input.url)) return 'Invalid URL';
    if (input.validity && !isValidValidity(input.validity)) return 'Invalid validity';
    if (input.shortcode && !isValidShortcode(input.shortcode)) return 'Invalid shortcode';
    return '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newInputs = inputs.map(input => ({ ...input, error: validate(input) }));
    setInputs(newInputs);
    const validInputs = newInputs.filter(i => !i.error && i.url);
    if (validInputs.length) onSubmit(validInputs);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {inputs.map((input, idx) => (
          <Grid item xs={12} key={idx}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Long URL"
                value={input.url}
                onChange={e => handleChange(idx, 'url', e.target.value)}
                required
                error={!!input.error}
                helperText={input.error}
                sx={{ flex: 2 }}
              />
              <TextField
                label="Validity (min)"
                value={input.validity}
                onChange={e => handleChange(idx, 'validity', e.target.value)}
                type="number"
                sx={{ width: 120 }}
              />
              <TextField
                label="Shortcode (optional)"
                value={input.shortcode}
                onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                sx={{ width: 160 }}
              />
              {inputs.length > 1 && (
                <Tooltip title="Remove this URL input">
                  <Button color="error" onClick={() => removeInput(idx)} sx={{ minWidth: 0 }}>
                    <RemoveCircleOutlineIcon />
                  </Button>
                </Tooltip>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" type="submit" startIcon={<AddCircleOutlineIcon />}>Shorten</Button>
        <Button variant="outlined" onClick={addInput} disabled={inputs.length >= 5} startIcon={<AddCircleOutlineIcon />}>Add URL</Button>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        You can shorten up to 5 URLs at once.
      </Typography>
    </Box>
  );
} 