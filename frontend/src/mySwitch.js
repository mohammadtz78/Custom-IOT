import {Switch} from "@material-ui/core";

const {withStyles} = require("@material-ui/styles");
export const MySwitch = withStyles(() => ({
    root:{marginTop:"10px"},
    switchBase: {
        color: "#ffffff",
        '&$checked': {
            color: "#ffffff",
        },
        '&$checked + $track': {
            backgroundColor: "#2bcbba",
        },
    },
    track: {
        backgroundColor: "#636e72",
        opacity: 0.8,
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />

    );
});