import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function UrlResultCard({ original, shortUrl, expiry }) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography>Original: {original}</Typography>
        <Typography>
          Shortened: <a href={shortUrl}>{shortUrl}</a>
        </Typography>
        <Typography>Expiry: {expiry || "Never"}</Typography>
      </CardContent>
    </Card>
  );
}
