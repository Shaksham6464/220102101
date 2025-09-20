import React, { useState } from "react";
import {
  Box, Typography, Button, Stack, Alert
} from "@mui/material";
import UrlForm from "../components/UrlForm";
import UrlResultCard from "../components/UrlResultCard";
import { isValidUrl, isValidInteger, isValidShortcode } from "../utils/validation";

const MAX_URLS = 5;

export default function UrlShortenerPage() {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [serverError, setServerError] = useState("");

  const handleChange = (i, key, value) => {
    const copy = [...urls];
    copy[i][key] = value;
    setUrls(copy);
  };

  const removeRow = (i) => setUrls(urls.filter((_, idx) => idx !== i));

  const addRow = () => {
    if (urls.length < MAX_URLS) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const validate = () => {
    const newErrors = urls.map((u) => {
      const e = {};
      if (!isValidUrl(u.url)) e.url = "Invalid URL";
      if (u.validity && !isValidInteger(u.validity)) e.validity = "Enter positive integer";
      if (u.shortcode && !isValidShortcode(u.shortcode)) e.shortcode = "Invalid shortcode";
      return e;
    });
    setErrors(newErrors);
    return newErrors.every((e) => Object.keys(e).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      // Replace with backend API
      const data = urls.map((u, idx) => ({
        original: u.url,
        shortUrl: `https://sho.rt/${u.shortcode || "code" + idx}`,
        expiry: u.validity ? `${u.validity} mins` : null,
      }));
      setResults(data);
      localStorage.setItem("shortened_urls", JSON.stringify(data));
    } catch (err) {
      setServerError("Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {urls.map((u, i) => (
            <UrlForm
              key={i}
              data={u}
              index={i}
              onChange={handleChange}
              onRemove={removeRow}
              errors={errors[i]}
              disableRemove={urls.length === 1}
            />
          ))}

          <Button onClick={addRow} disabled={urls.length >= MAX_URLS}>
            Add Another
          </Button>
          <Button type="submit" variant="contained">Shorten URLs</Button>
        </Stack>
      </form>

      {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}

      <Box mt={4}>
        <Typography variant="h5">Results</Typography>
        {results.length === 0 ? (
          <Typography>No shortened URLs yet.</Typography>
        ) : (
          results.map((r, i) => <UrlResultCard key={i} {...r} />)
        )}
      </Box>
    </Box>
  );
}
