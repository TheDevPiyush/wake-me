import React, { Component } from 'react'
import sound from '../Assests/sound.mp3'

let Hr = (new Date().getHours() - 12).toString()
let Min = new Date().getMinutes().toString()
let Sec = new Date().getSeconds().toString()
let music = new Audio(sound)
music.loop = true
export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            time: Hr + " : " + Min + " : " + Sec,
            HourInput: "",
            MinInput: "",
            isAlarm: false,
        }
    }
    async componentDidMount() {
        setInterval(() => {
            this.UptimeClock()
        }, 1000);
    }

    UptimeClock = () => {
        Hr = (new Date().getHours() - 12).toString()
        Min = new Date().getMinutes().toString()
        Sec = new Date().getSeconds().toString()
        this.setState({ time: Hr + " : " + Min + " : " + Sec })
    }

    GetHours = (e) => {
        this.setState({ HourInput: e.target.value })
        console.log(e.target.value)
    }

    GetMins = (e) => {
        this.setState({ MinInput: e.target.value })
        console.log(e.target.value)
    }

    Stop = () => {
        this.setState({ isAlarm: false })
        this.setState({ HourInput: "" })
        this.setState({ MinInput: "" })
        document.getElementById("hr").value = null
        document.getElementById("min").value = null
        music.pause()
        music.currentTime = 0
    }

    render() {

        if (Hr === this.state.HourInput && Min === this.state.MinInput) {
            this.setState({ isAlarm: true })
        }
        if (this.state.isAlarm) {
            music.play()
        }

        return (
            <>
                <div className="body text-center py-5 my-5">

                    <div >
                        {this.state.time}
                    </div>

                    <div className="input">
                        <input className='hours py-2 my-4 mx-3' id='hr' type="number" placeholder='Enter Hour :' onChange={this.GetHours} />
                        <input className='mins py-2 my-2 mx-3' id='min' type="number" placeholder='Enter Mins :' onChange={this.GetMins} />
                    </div>

                    {this.state.isAlarm &&
                        <div className="btn btn-primary" onClick={this.Stop}>
                            Stop Alarm
                        </div>}

                </div>
            </>
        )
    }
}
