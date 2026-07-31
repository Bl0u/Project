import { Typography } from "@mui/material";
import {Stack} from "@mui/material";
export function LoginPageHeader(){


    return (
        <>
        <Stack row={2} spacing={2}>
            <Typography variant="h5" style={{
                color: "black"
            }}> Welcome Back!</Typography>
            <Typography variant="h6" > Sign in to access your dashboard and test CRUD operation</Typography>
        </Stack>
        </>
    )
}