import './App.module.css';
import * as React from 'react';
import {Box, Button, Grid, MenuItem, Select, Slider, Typography} from "@material-ui/core";
import classes from "./App.module.css"
import {MySwitch} from "./mySwitch";
import fan from "./pictures/fan4.png"
import Timer from "react-compound-timer";
import openSocket from 'socket.io-client'
import MediaQuery from "react-responsive";

export class App extends React.Component {
    state = {
        leftTime: 0,
        relays: {
            mirrorLights: false,
            charger: false,
            bedLights: false,
            fan: false,
            deskLights: false,
            coolPad: false,
            speakers: false,
            readingLights: false,
            roomLights: false,
            nightLights: false,
            fanTime: null
        },
        timer: {
            h: 0,
            m: 0,
            s: 0
        }
    }
    updateState = () => {
        let url = "http://192.168.1.40:8090/iot/getStates"
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(res => res.json().then(r => {
            let leftS
            if (r.fanTime) {
                let current = new Date().getTime()
                let end = new Date(r.fanTime).getTime()
                leftS =
                    leftS = Math.floor(end - current)
                setTimeout(this.updateState, leftS)
            }
            this.setState({
                relays: {
                    mirrorLights: r.mirrorLights && r.power,
                    charger: r.charger,
                    bedLights: r.bedLights,
                    fan: r.fan,
                    deskLights: r.deskLights,
                    coolPad: r.coolpad,
                    nightLights: r.nightLights,
                    speakers: r.speakers,
                    readingLights: r.readingLights && r.power,
                    roomLights: r.roomLights,
                    fanTime: r.fanTime,
                }, leftTime: r.fanTime ? leftS : 0
            })
        })).catch(err => {
            console.log(err);
        })
    }


    componentDidMount() {
        this.updateState()
        const socket = openSocket('http://192.168.1.40:8090');
        socket.on('relays', data => {
            this.updateState()
        });
    }

    handleSwitchChange = (event) => {
        let url = "http://192.168.1.40:8090/iot/switch"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({relay: event.target.name, state: event.target.checked})
        }).then(res => res.json().then(r => {
            this.updateState()
        })).catch(err => {
            console.log(err);
        })
    }

    handleButtonClick =(relay)=>{
        let url = "http://192.168.1.40:8090/iot/switch"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({relay: relay, state: !this.state.relays[relay]})
        }).then(res => res.json().then(r => {
            this.updateState()
        })).catch(err => {
            console.log(err);
        })
    }

    handleTimerChange = (event) => {
        let timer = this.state.timer
        timer[event.target.name] = event.target.value
        this.setState({timer: timer})
    }

    handleSetTimer = () => {
        let timer = this.state.timer
        let time = ((timer.h * 3600) + (timer.m * 60) + timer.s) * 1000
        let url = "http://192.168.1.40:8090/iot/switch"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({relay: "fanTimer", time: time})
        }).then(res => res.json().then(r => {
            this.updateState()
        })).catch(err => {
            console.log(err);
        })
    }

    render() {
        console.log(this.state.relays);
        let hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        let ms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]

        const style = {
            fontFamily: "Courgette",
            fontSize: "18px",
            color: "#ffffff",
            marginTop: "15px"
        }
        return (
            <React.Fragment>
                <Box className={classes.box}>
                    <Box style={{background: "rgba(0, 0, 0, 0.6)", minHeight: "100vh", padding: "1vmax"}}>
                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>laptop</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.charger} onChange={this.handleSwitchChange}
                                          name="laptop"/>
                            </Grid>
                            <Grid item xs={1}>
                                <React.Fragment>
                                    <MediaQuery minWidth={500}>
                                        <Button
                                            style={{
                                                marginTop: "17px",
                                                // padding: "1px",
                                                marginLeft: "-50px",
                                                fontSize: "12px"
                                            }}
                                            variant="contained" color={this.state.relays.coolPad ? "primary" : "default"} size="small"
                                            onClick={()=>this.handleButtonClick("coolPad")}
                                            name="coolPad"
                                        >
                                        coolpad
                                        </Button>
                                    </MediaQuery>
                                    <MediaQuery maxWidth={500}>
                                        <Button
                                            style={{
                                                marginTop: "17px",
                                                // padding: "1px",
                                                marginLeft: "30px",
                                                fontSize: "12px",
                                            }}
                                            variant="contained" color={this.state.relays.coolPad ? "primary" : "default"} size="small"
                                            onClick={()=>this.handleButtonClick("coolPad")}
                                            name="coolPad"
                                        >
                                           coolpad
                                        </Button>
                                    </MediaQuery>

                                </React.Fragment>

                            </Grid>
                            <Grid item xs={1}>
                                <React.Fragment>
                                    <MediaQuery minWidth={500}>
                                        <Button
                                            style={{
                                                marginTop: "17px",
                                                // padding: "1px",
                                                marginLeft: "-80px",
                                                fontSize: "12px"
                                            }}
                                            variant="contained" color={this.state.relays.nightLights ? "primary" : "default"} size="small"
                                            onClick={()=>this.handleButtonClick("nightLights")}
                                            name="nightLights"
                                        >
                                         light
                                        </Button>
                                    </MediaQuery>
                                    <MediaQuery maxWidth={500}>
                                        <Button
                                            style={{
                                                marginTop: "17px",
                                                // padding: "1px",
                                                marginLeft: "85px",
                                                fontSize: "12px"
                                            }}
                                            variant="contained" color={this.state.relays.nightLights ? "primary" : "default"} size="small"
                                            onClick={()=>this.handleButtonClick("nightLights")}
                                            name="nightLights"
                                        >
                                         light
                                        </Button>
                                    </MediaQuery>

                                </React.Fragment>

                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>lights</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.roomLights} onChange={this.handleSwitchChange}
                                          name="roomLights"/>
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>speakers</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.speakers} onChange={this.handleSwitchChange}
                                          name="speakers"/>
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>reading lights</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.readingLights} onChange={this.handleSwitchChange}
                                          name="readingLights"/>
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>bed lights</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.bedLights} onChange={this.handleSwitchChange}
                                          name="bedLights"/>
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>mirror lights</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.mirrorLights} onChange={this.handleSwitchChange}
                                          name="mirrorLights"/>
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>desk lights</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.deskLights} onChange={this.handleSwitchChange}
                                          name="deskLights"/>
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={5} md={2}>
                                <Typography style={style}>fan</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <MySwitch checked={this.state.relays.fan} onChange={this.handleSwitchChange}
                                          name="fan"/>
                            </Grid>
                        </Grid>
                        {this.state.relays.fanTime ?
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item xs={6}>
                                    <Timer initialTime={this.state.leftTime} direction={"backward"}>
                                        {() => (
                                            <Typography style={{...style, color: "#008191"}}>ends
                                                in <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/></Typography>
                                        )}
                                    </Timer>
                                </Grid>
                            </Grid> :
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item xs={2} md={1}>
                                    <Typography style={{...style, color: "#008191"}}>timer</Typography>
                                </Grid>
                                <Grid item xs={3} md={1}>
                                    <Select
                                        name="h"
                                        id="hour"
                                        value={this.state.timer.h}
                                        style={{
                                            backgroundColor: "#ffffff",
                                            marginTop: "10px",
                                            padding: "1px",
                                            paddingLeft: "8px"
                                        }}
                                        onChange={this.handleTimerChange}
                                    >
                                        {hour.map(((item, index) => (
                                            <MenuItem key={index} value={index}>{index}</MenuItem>)))}
                                    </Select>
                                </Grid>

                                <Grid item xs={3} md={1}>
                                    <Select
                                        name="m"
                                        id="minute"
                                        value={this.state.timer.m}
                                        style={{
                                            marginLeft: "-35px",
                                            backgroundColor: "#ffffff",
                                            marginTop: "10px",
                                            padding: "1px",
                                            paddingLeft: "8px"
                                        }}
                                        onChange={this.handleTimerChange}
                                    >
                                        {ms.map(((item, index) => (
                                            <MenuItem key={index} value={index}>{index}</MenuItem>)))}
                                    </Select>
                                </Grid>

                                <Grid item xs={3} md={1}>
                                    <Select
                                        name="s"
                                        id="second"
                                        value={this.state.timer.s}
                                        style={{
                                            backgroundColor: "#ffffff",
                                            marginLeft: "-70px",
                                            marginTop: "10px",
                                            padding: "1px",
                                            paddingLeft: "8px"
                                        }}
                                        onChange={this.handleTimerChange}
                                    >
                                        {ms.map(((item, index) => (
                                            <MenuItem key={index} value={index}>{index}</MenuItem>)))}
                                    </Select>
                                </Grid>
                                <Grid item xs={1} md={1}>
                                    <Button style={{
                                        marginTop: "13px",
                                        padding: "1px",
                                        marginLeft: "-70px"
                                    }}
                                            variant="contained" color="secondary"
                                            onClick={this.handleSetTimer}>
                                        set

                                    </Button>
                                </Grid>
                            </Grid>}
                    </Box>
                </Box>
                <Box hidden={true} className={classes.ac}>
                    <img className={classes.fan} src={fan}/>
                    <Box style={{padding: "7px", marginLeft: "10px", marginRight: "15px"}}>
                        <Typography style={{
                            fontFamily: "Courgette",
                            textShadow: "2px 2px 10px #ffffff",
                            fontSize: "18px",
                            marginTop: "5px",
                            color: "#7ed6df"
                        }}>Room Temperature : 26 c°
                        </Typography>

                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={4}>
                                <Typography style={{
                                    fontFamily: "Courgette",
                                    textShadow: "2px 2px 10px #ffffff",
                                    fontSize: "15px",
                                    marginTop: "50px",
                                    color: "#7ed6df"
                                }}>Fan speed: </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Slider
                                    style={{marginTop: "50px"}}
                                    defaultValue={2}
                                    // getAriaValueText={valuetext}
                                    // aria-labelledby="discrete-slider"
                                    valueLabelDisplay="on"
                                    step={1}
                                    marks
                                    min={1}
                                    max={6}
                                />
                            </Grid>

                        </Grid>
                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Grid item xs={4}>
                                <Typography style={{
                                    fontFamily: "Courgette",
                                    textShadow: "2px 2px 10px #ffffff",
                                    fontSize: "15px",
                                    marginTop: "50px",
                                    color: "#7ed6df"
                                }}>Temperature: </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Slider
                                    style={{marginTop: "50px"}}
                                    defaultValue={27}
                                    // getAriaValueText={valuetext}
                                    // aria-labelledby="discrete-slider"
                                    valueLabelDisplay="on"
                                    step={1}
                                    marks
                                    min={18}
                                    max={32}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </React.Fragment>
        );
    };
};

export default App;
