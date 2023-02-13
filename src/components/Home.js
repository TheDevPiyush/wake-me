import React, { Component } from 'react'
import sound from '../Assests/sound.mp3'
import "./Home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let Hr = new Date().getHours().toString()
let Min = new Date().getMinutes().toString()
let Sec = new Date().getSeconds().toString()



if (Hr > 12) {
    Hr = (new Date().getHours() - 12).toString()
}
if (Hr <= 9) {
    Hr = "0" + Hr
}
if (Min <= 9) {
    Min = "0" + Min
}


let music = new Audio(sound)
music.loop = true
export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            time: Hr + ":" + Min,
            Hour: "",
            Minutes: "",
            isAlarm: false,
            AlarmSet: false,
            HourText: "Hour",
            MinuteText: "Minute",
            btnState: "disabled",
            HourBtnState: "enabled",
            MinBtnState: "enabled",
            notifyCount : 0
        }
    }
    async componentDidMount() {

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                return
            }
        })

        toast.info(`Current time is : ${this.state.time}`, {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        this.UptimeClock()
        setInterval(() => {
            this.UptimeClock()
        }, 1000);
        setInterval(() => {
            this.AlarmAndBtnState()
        }, 200);
    }

    ConvertInTwoDigit = () => {
        if (Hr <= 9) {
            Hr = "0" + Hr
        }
        if (Min <= 9) {
            Min = "0" + Min
        }
        if (Sec <= 9) {
            Sec = "0" + Sec
        }

    }

    UptimeClock = async () => {
        Hr = new Date().getHours().toString()
        if (Hr > 12) {
            Hr = (new Date().getHours() - 12).toString()
        }
        Min = new Date().getMinutes().toString()
        Sec = new Date().getSeconds().toString()
        this.ConvertInTwoDigit()
        this.setState({ time: Hr + " : " + Min + " : " + Sec })

    }

    Stop = () => {
        this.setState({ isAlarm: false })
        this.setState({ AlarmSet: false })
        this.setState({ Hour: "" })
        this.setState({ Minutes: "" })
        music.pause()
        music.currentTime = 0

        toast.success(`Alarm Stopped/Cancelled`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    set = () => {
        setTimeout(() => {
            this.setState({ AlarmSet: true })
            toast.info(`Alarm set for ${this.state.Hour + ":" + this.state.Minutes}`, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });



        }, 200);


    }

    AlarmAndBtnState = () => {
        if (this.state.Hour !== "" && this.state.Minutes !== "") {
            this.setState({ btnState: "enabled" })
        }
        else {
            this.setState({ btnState: "disabled" })
        }
        if (this.state.AlarmSet) {
            if (Hr === this.state.Hour && Min === this.state.Minutes) {
                this.setState({ isAlarm: true })
                music.play()
                if (this.state.notifyCount < 1){
                    new Notification ("Wake Up", {body:"Your Alram is here"})
                    this.setState({notifyCount : this.state.notifyCount + 1})
                }
            }
        }
        if (this.state.AlarmSet) {
            this.setState({ HourBtnState: "disabled", MinBtnState: "disabled" })
        }
        else {
            this.setState({ HourBtnState: "enabled", MinBtnState: "enabled" })
        }
    }


    render() {


        return (
            <>

                <div className="my">
                    <h1 className='my-5 text-center wake'>
                        <u>
                            Wake Me!!
                        </u>
                    </h1>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <div className="my-5">
                    <div className="body text-center py-3 py-5">

                        <button type="button" className={`btn fs-3 btn-info mx-2 px-4 fw-bold border border-white border-2 dropdown-toggle ${this.state.HourBtnState}`} data-bs-toggle="dropdown" aria-expanded="false">
                            {this.state.Hour !== "" ? this.state.Hour : this.state.HourText}
                        </button>

                        <ul className="dropdown-menu border border-3 border-white" style={{ "maxHeight": "250px", "overflow": "auto", "cursor": "pointer", "backgroundColor": "black" }}>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "00" }) }}>12 (MidNight)</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "01" }) }}>01</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "02" }) }}>02</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "03" }) }}>03</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "04" }) }}>04</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "05" }) }}>05</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "06" }) }}>06</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "07" }) }}>07</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "08" }) }}>08</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "09" }) }}>09</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "10" }) }}>10</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "11" }) }}>11</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Hour: "12" }) }}>12 (Noon)</li>
                        </ul>

                        <strong className='fs-3 fw-bold'>:</strong>

                        <button type="button" className={`btn fs-3 btn-info px-4 fw-bold mx-2 border border-white border-2 dropdown-toggle ${this.state.MinBtnState}`} data-bs-toggle="dropdown" aria-expanded="false">
                            {this.state.Minutes !== "" ? this.state.Minutes : this.state.MinuteText}
                        </button>

                        <ul className="dropdown-menu border border-3 border-white" style={{ "maxHeight": "250px", "overflow": "auto", "cursor": "pointer", "backgroundColor": "black" }}>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "00" }) }}>00</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "01" }) }}>01</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "02" }) }}>02</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "03" }) }}>03</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "04" }) }}>04</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "05" }) }}>05</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "06" }) }}>06</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "07" }) }}>07</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "08" }) }}>08</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "09" }) }}>09</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "10" }) }}>10</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "11" }) }}>11</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "12" }) }}>12</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "13" }) }}>13</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "14" }) }}>14</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "15" }) }}>15</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "16" }) }}>16</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "17" }) }}>17</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "18" }) }}>18</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "19" }) }}>19</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "20" }) }}>20</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "21" }) }}>21</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "22" }) }}>22</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "23" }) }}>23</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "24" }) }}>24</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "25" }) }}>25</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "26" }) }}>26</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "27" }) }}>27</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "28" }) }}>28</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "29" }) }}>29</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "30" }) }}>30</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "31" }) }}>31</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "32" }) }}>32</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "33" }) }}>33</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "34" }) }}>34</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "35" }) }}>35</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "36" }) }}>36</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "37" }) }}>37</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "38" }) }}>38</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "39" }) }}>39</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "40" }) }}>40</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "41" }) }}>41</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "42" }) }}>42</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "43" }) }}>43</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "44" }) }}>44</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "45" }) }}>45</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "46" }) }}>46</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "47" }) }}>47</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "48" }) }}>48</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "49" }) }}>49</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "50" }) }}>50</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "51" }) }}>51</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "52" }) }}>52</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "53" }) }}>53</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "54" }) }}>54</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "55" }) }}>55</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "56" }) }}>56</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "57" }) }}>57</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "58" }) }}>58</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "59" }) }}>59</li>
                            <li className="dropdown-item text-white" onClick={() => { this.setState({ Minutes: "00" }) }}>60</li>
                        </ul>

                    </div>
                </div>


                {
                    this.state.isAlarm &&

                    <div className="text-center">
                        <div className="btn btn-danger px-4 border fs-4 border-light border-2 " onClick={this.Stop}>
                            Stop Alarm <i className="fa fa-stop" aria-hidden="true"></i>
                        </div>
                    </div>
                }

                {
                    !this.state.AlarmSet &&

                    <div className="text-center">
                        <div className={`btn btn-primary px-4 fs-4 border border-light border-2 ${this.state.btnState}`} onClick={this.set}>
                            Set Alarm <i className="fa fa-play-circle" aria-hidden="true"></i>
                        </div>
                    </div>
                }

                {
                    this.state.AlarmSet && !this.state.isAlarm &&

                    <div className="text-center">
                        <div className="btn btn-warning px-4 fs-4 fw-bold border border-light border-2 " onClick={this.Stop}>
                            Cancel Alarm <i className="fa fa-plus" style={{ "transform": "rotate(45deg)" }} aria-hidden="true"></i>
                        </div>
                    </div>
                }

            </>
        )
    }
}
