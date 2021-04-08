import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";
import ListIcon from '@material-ui/icons/List';
import {useRouter} from "next/router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        },
        list: {
            width: 250
        },
        fullList: {
            width: 'auto'
        }
    })
);

export const NavBar = () => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const router = useRouter();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={() => setOpenDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Drawer anchor={"left"} open={openDrawer} onClose={() => setOpenDrawer(false)}>
                    <div className={classes.list}
                         role={'presentation'}
                         onClick={() => setOpenDrawer(false)}>
                        <List>
                            <ListItem button onClick={() => router.push('/')}>
                                <ListItemIcon><ListIcon/></ListItemIcon>
                                <ListItemText primary={'Select Screen'}/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <Typography variant="h6" className={classes.title}>
                    MASHEEN Data Viewer
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
