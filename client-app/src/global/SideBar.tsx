import  { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme, } from "@mui/material"
import { Link } from "react-router-dom";
import { tokens } from "../theme";
// import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


interface ItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;    
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
  }

const Item = ({title, to, icon, selected, setSelected}: ItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return ( 
        <MenuItem 
            active={selected === title} 
            style={{ color: colors.grey[100]}} 
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
                <Link to={to} />
        </MenuItem>
    )
}

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        
        <Box
        sx={{
            "& .pro-sidebar-inner" : {
                background: `${colors.primary[400]} !important`
               },
               "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important"
               },
               "& .pro-inner-item": {
                   padding: "5px 35px 5px 30px !important"
               },
               "& .pro-inner-item:hover": {
                   color: "#868dfb !important"
               },
               "& .pro-menu-item.active" : {
                   color: "#6870fa !important"
                }
            }}
            >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon />: undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                    {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                            mb="100px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                                MENU
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            {/* <Box display="flex" justifyContent="center" alignItems="center">
                                <img 
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/download.jpg`}
                                    style={{ cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box> */} 

                            <Box textAlign="center">
                                <Typography 
                                    variant="h2" 
                                    color={colors.grey[100]} 
                                    fontWeight={"bold"} 
                                    sx={{ m: "10px 0 0 0"}}
                                    >
                                        Kevin Kalfon
                                </Typography>
                                <Typography 
                                    variant="h5" 
                                    color={colors.greenAccent[500]}
                                    >
                                        Humble developer
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
        );
}

export default SideBar;