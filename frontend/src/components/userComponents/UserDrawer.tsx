import { Box, List, ListItem, ListItemButton, ListItemText,ListItemIcon, Switch, Avatar, ListItemAvatar, Typography, PaletteMode } from '@mui/material'
import {ArchiveRounded, Article, Home, ModeNight, Settings} from '@mui/icons-material';
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/hooks/useTheme';
import { useCustomParams, useCustomPathname, useCustomRouter } from '@/hooks/customRouter';



interface ModeProps{
    setOpen?: (open:boolean)=>void;
}

export default function sideBar({setOpen}:ModeProps) {
    const {mode,setMode} = useTheme();
    const id = useCustomParams();
    const router = useCustomRouter();
    const pathname = useCustomPathname();


  return (

<Box p={2}>
    <Box >
        {/* Home */}
        {/* Profile */}
        {/* My Posts */}
        {/* Dart mode */}
        <List>
            <ListItem disablePadding>
                <ListItemButton component="a"  onClick={()=>{router.push(`/user/${id}/`);setOpen?.(false); }} sx={{bgcolor:pathname===`/user/${id}`?"#F0F8FF":"transparent","&:hover":{bgcolor:"#F0F8FF"}}}>
                    <ListItemIcon ><Home/></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a"  onClick={()=>{router.push(`/user/${id}/profile`);setOpen?.(false); }}  sx={{bgcolor:pathname===`/user/${id}/profile`?"#F0F8FF":"transparent","&:hover":{bgcolor:"#F0F8FF"}}}>
                    <ListItemIcon >
                            <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
                <ListItemButton component="a"  onClick={()=>{router.push(`/user/${id}/posts`);setOpen?.(false); }}  sx={{bgcolor:pathname===`/user/${id}/posts`?"#F0F8FF":"transparent","&:hover":{bgcolor:"#F0F8FF"}}}>
                    <ListItemIcon >
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Posts"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" sx={{"&:hover":{bgcolor:"transparent"}}}>
                <ListItemIcon >
                    <DarkModeIcon sx={{color:mode==="light"?"unset":"yellow"}}/>
                </ListItemIcon>
                <Switch onChange={(e)=>setMode(mode==="light"?"dark":"light")}/>
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
</Box>
  )
}
