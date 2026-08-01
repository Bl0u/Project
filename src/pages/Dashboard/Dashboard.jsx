import { ThemeToggle } from "../Home/components/ThemeToggle";
import {Typography} from "@mui/material";
export function Dashboard(){


    return (
        <>
            <ThemeToggle></ThemeToggle>
            <Typography variant="h5" style={{
                color: "black"
            }}> Welcome to Dashboard!</Typography>
        </>
    )
}