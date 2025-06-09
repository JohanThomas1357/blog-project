import { Box, List, ListItem, ListItemButton, ListItemText,ListItemIcon, Switch, PaletteMode } from '@mui/material'
import {Home} from '@mui/icons-material';
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/hooks/useTheme';
import { useCustomParams, useCustomPathname, useCustomRouter } from '@/hooks/customRouter';

interface sideBarProps{
    setRouting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function sideBar({setRouting}:sideBarProps) {
    const {mode,setMode} = useTheme();
    const id = useCustomParams();

    const pathname = useCustomPathname();

    const router  = useCustomRouter();
  return (

<Box pl={2} sx={{display:{xs:"none",md:"block",maxWidth:"max-content"}}}  flex={1}  >
    <Box  position="sticky" sx={{top:"100px",width:"100%"}}>
        {/* Home */}
        {/* Profile */}
        {/* My Posts */}
        {/* Dart mode */}
        <List>
            <ListItem disablePadding>
                <ListItemButton component="a" onClick={()=>{setRouting(true);router.push(`/user/${id}/`)}} sx={{bgcolor:pathname===`/user/${id}`?mode==="light"?"#F0F8FF":"grey":"transparent","&:hover":{bgcolor:mode==="light"?"#F0F8FF":"grey"}}}>
                    <ListItemIcon ><Home/></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" onClick={()=>{setRouting(true);router.push(`/user/${id}/profile`)}}  sx={{bgcolor:pathname===`/user/${id}/profile`?mode==="light"?"#F0F8FF":"grey":"transparent","&:hover":{bgcolor:mode==="light"?"#F0F8FF":"grey"}}}>
                    <ListItemIcon >
                            <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
                <ListItemButton component="a" onClick={()=>{setRouting(true);router.push(`/user/${id}/posts`)}} sx={{bgcolor:pathname===`/user/${id}/posts`?mode==="light"?"#F0F8FF":"grey":"transparent","&:hover":{bgcolor:mode==="light"?"#F0F8FF":"grey"}}}>
                    <ListItemIcon >
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Posts"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a"  sx={{"&:hover":{bgcolor:"transparent"}}}>
                <ListItemIcon >
                    <DarkModeIcon sx={{color:mode==="light"?"unset":"yellow"}}/>
                </ListItemIcon>
                <Switch checked={mode==="light"?false:true} onChange={(e)=>setMode(mode==="light"?"dark":"light")}/>
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
</Box>
  )
}
