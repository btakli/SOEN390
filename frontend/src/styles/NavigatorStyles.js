export const drawerWidth = 240;

export const backgroundColor = "#101F33";
const fontColor = "#ffffff";

export const drawerStyle = {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        }
    };
  
export const itemStyle = {
    py: 0,
    px: 0,
    color: fontColor,
    "&:hover, &:focus": {
        bgcolor: "#20e3ac",
    },
};

export const itemTitleStyle = {
    boxShadow: "0px 6px 13px 0px #00bcd4",
    py: 2,
    px: 3,
    color: fontColor,
};

export const drawerTitleStyle = {
    ...itemTitleStyle,
    fontSize: 22
};