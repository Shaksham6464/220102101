import React from "react";
import { Grid, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UrlForm({ data, index, onChange, onRemove, errors, disableRemove }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Original URL"
          fullWidth
          value={data.url}
          onChange={(e) => onChange(index, "url", e.target.value)}
          error={!!errors?.url}
          helperText={errors?.url}
          required
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          label="Validity (minutes)"
          fullWidth
          value={data.validity}
          onChange={(e) => onChange(index, "validity", e.target.value)}
          error={!!errors?.validity}
          helperText={errors?.validity || "Optional"}
        />
      </Grid>
      <Grid item xs={5} md={2}>
        <TextField
          label="Preferred Shortcode"
          fullWidth
          value={data.shortcode}
          onChange={(e) => onChange(index, "shortcode", e.target.value)}
          error={!!errors?.shortcode}
          helperText={errors?.shortcode || "Optional"}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => onRemove(index)} disabled={disableRemove}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
