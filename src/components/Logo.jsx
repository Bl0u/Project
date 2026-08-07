import { Box, Stack, Typography } from "@mui/material";
import "@fontsource/inter";

export function Logo() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={0} alignItems="center">
        <Box
          sx={{
            width: 22,
            height: 22,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2.5,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            position: "relative",
            zIndex: 2, // Bubble is above the drips

            "&::before": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 3,
              width: 6,
              height: 14,
              bgcolor: "primary.main",
              borderRadius: "999px",
              zIndex: -1, // Behind the bubble
            },

            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -14,
              left: 15,
              width: 5,
              height: 22,
              bgcolor: "primary.main",
              borderRadius: "999px",
              zIndex: -1, // Behind the bubble
            },
          }}
        >
          V
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              color: "primary.main",
            }}
          ></Box>
          Bot
        </Typography>
      </Stack>
    </Box>
  );
}


export default Logo ;