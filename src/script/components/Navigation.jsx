import React, {useState} from "react";
import clsx from "clsx";
import '../../style/navigation.scss';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MiniCart from './MiniCart';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
	display: "flex",
	position: 'relative',
  },
  toolbar: {
	boxShadow: 'none',
	marginLeft: '20px',
  },
  appBar: {
    background: "#FAF9F8",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
	}), 
	position: 'relative'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
	})
  },
  menuButton: {
    marginRight: theme.spacing(2),
	color: "#333333",
  },
  hide: {
    display: "none"
  },
  drawer: {
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    color: '#333333',
  },
  content: {
    flexGrow: 1,
    color: "#333333",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  removeShadow: {
	boxShadow: 'none'
  },
  contentShift: {
    color: '#333333',
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }, 
  listItem: {
	  color: '#333333'
  }
}));

const Navigation = () => {

	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = useState(false);
	const [displayMiniCart, setDisplayMiniCart] = useState(false)

	let cartList = useSelector(state => state.cart);
	let cartCount = cartList.length;
	
	const links = [
		{
			text: 'News',
			link:'news'
		},
		{
			text: 'Browse',
			link:'browse'
		},
		{
			text: 'Inspiration',
			link:'inspiration'
		},
		{
			text: 'The Room',
			link:'theroom'
		}
	]

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const showMiniCart = () => {
		setDisplayMiniCart(true);
	}

	const closeMiniCart = () => {
		if (displayMiniCart === true) {
			setDisplayMiniCart(false)
		} 
	}

	return (
		<div className="row navigation">
			<div className={`columns ${classes.root} navigation__drawer`}>
			<CssBaseline/>
			<AppBar
				position="fixed"
				classes={{
					root: classes.removeShadow
				}}
				className={clsx(classes.appBar, {
				[classes.appBarShift]: open
				})}
			>
				<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					className={clsx(classes.menuButton, open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<a href="/home"><div className="navigation__logo"></div></a>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
				paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "ltr" ? (
					<ChevronLeftIcon />
					) : (
					<ChevronRightIcon />
					)}
				</IconButton>
				</div>
				<Divider />
					<List>
						{links.map((item, index) => (
							<a href={item.link} key={index}>
								<ListItem button key={index}>
									<ListItemText primary={item.text} className={classes.listItem} />
								</ListItem>
							</a>
						))}
					</List>
				<Divider />
			</Drawer>
			</div>
			<div className="columns medium-7 large-4 navigation__links--right">
				<a href="/favorites" className="navigation__item navigation__item--icon-favorites">Favorites</a>
				<a href="/mypages" className="navigation__item navigation__item--icon-mypages">My pages</a>
				<p onClick={() => {showMiniCart(); closeMiniCart()}} className="navigation__item navigation__item--icon-cart">Cart<span> ({cartCount})</span></p>
			</div>
			{displayMiniCart ? <MiniCart cartCount={cartCount} cartList={cartList} setDisplayMiniCart={setDisplayMiniCart}/> : null}
		</div>
	);
	}
export default Navigation;
