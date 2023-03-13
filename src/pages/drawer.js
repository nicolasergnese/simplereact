import React, { useEffect } from 'react';
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';



export default function DrawerC({ open, listClient, setOpen }) {
    useEffect(() => {
        console.log("drawer");
    }, [open]);
    const navigate = useNavigate();
    //getListClient();
    const handleClick = (item) => {
        sessionStorage.setItem("item", JSON.stringify(item));
        setOpen(!open);
        navigate("/detail/" + item.client_id)
    }

    const handleClickHome = (item) => {
        sessionStorage.setItem("item", null);
        setOpen(!open);
        navigate("/")
    }

    const list = () => (
        <Box
            role="presentation"
        >
            <List>
                {['Home'].map((text, index) => (
                    <ListItem key={text} disablePadding onClick={() => handleClickHome(text)}>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {listClient.map((text, index) => (
                    <ListItem key={index} disablePadding onClick={() => handleClick(text)}>
                        <ListItemButton >
                            {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
                            <ListItemText primary={text.client_name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );


    return (
        <Drawer
            anchor="left"
            variant="persistent"
            open={open}
        >
            {list()}
        </Drawer>
    )
}