import Box from "@mui/material/Box";
import { Testimonial } from "./components/Testimonial";

import Typography from "@mui/material/Typography";
export function LoginRightPanel() {
  return (
    <>
      <Box
        sx={{
          flex: 3,
          p: 8,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          background: `
            radial-gradient(
              circle at top right,
              rgba(93,170,170,0.7) 0%,
              rgba(93,170,170,0.5) 25%,
              transparent 70%
            ),
            linear-gradient(
              135deg,
              #0E4A52 0%,
              #0C4248 45%,
              #0A353A 100%
            )
          `,
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={3}>
          Revolutionize playing with
          <br />
          Smarter Automation
        </Typography>

        {/* import profile image for rose */}
        <Testimonial
          pictureUrl="https://i.pravatar.cc/150"
          testimonial="vBot has completely transformed Automation process. It's reliable,
          efficient, and ensures our playing experience are always top-notch."
        ></Testimonial>
      </Box>
    </>
  );
}
