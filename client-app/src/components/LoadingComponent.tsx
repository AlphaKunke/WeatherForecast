import { Dimmer, Loader } from 'semantic-ui-react';
import { useTheme } from '@mui/material';
import { tokens } from "../theme";

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({
    inverted = true, 
    content="Loading..."}: Props) {
    
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);

    return (
        <Dimmer 
            active={true} 
            inverted={inverted}
            style={{ backgroundColor: colors.primary[500] }}>
            <Loader content={content} style={{ color: colors.grey[900] }}  />
        </Dimmer>
    )
}