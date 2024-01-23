import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface HeaderProps {
    title: string,
    subtitle: string
};

const Header = ({ title, subtitle }: HeaderProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="50px">
            <Typography 
                variant="h2" 
                color={colors.grey[100]} 
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography 
                variant="h4"
                color={colors.greenAccent[400]}
                sx={{ textAlign: "center" }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
}

export default Header;