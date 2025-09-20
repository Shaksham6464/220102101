import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import UrlResultCard from "../components/UrlResultCard";

export default function UrlStatisticsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("shortened_urls");
    if (saved) setUrls(JSON.parse(saved));
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography>No URLs shortened yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {urls.map((u, i) => <UrlResultCard key={i} {...u} />)}
        </Stack>
      )}
    </Box>
  );
}
