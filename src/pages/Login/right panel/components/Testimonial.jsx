import { Avatar, Stack, Typography } from "@mui/material";

export function Testimonial({ pictureUrl, testimonial }) {
  return (
    <Stack spacing={3}>
      <Typography
        variant="body1"
        sx={{
          maxWidth: 500,
          opacity: 0.85,
          lineHeight: 1.8,
        }}
      >
        {`"${testimonial}"`}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={pictureUrl}>R</Avatar>

        <Stack spacing={0}>
          <Typography variant="subtitle1" fontWeight={700}>
            Rose
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            QA Engineer
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}