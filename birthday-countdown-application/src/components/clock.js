import React, { Component } from "react";


class Clock extends Component {

    constructor(props) {
        super(props)

        this.timer = 0
        this.birthday = props.birthdayFormState.startDate.toString();

        this.state = {
            timeRemaining: this.getTimeRemaining(this.props.birthdayFormState.startDate.toString())
        }

        this.getTimeRemaining = this.getTimeRemaining.bind(this);
        this.getAge = this.getAge.bind(this);

        this.noBirthYear = new Date(this.birthday).getFullYear() >= new Date().getFullYear();
    
    }

    componentWillReceiveProps(nextProps) {
        console.log(`next props: ${JSON.stringify(nextProps)}`)
    }

    getTimeRemaining(birthday) {

        var bday = new Date(birthday)
        let today = new Date();
        
        const currentMonth = today.getMonth();
        const birthdayMonth = bday.getMonth();

        if (birthdayMonth > currentMonth) {
            bday.setFullYear(today.getFullYear());
        } else if (birthdayMonth < currentMonth) {
            bday.setFullYear(today.getFullYear() + 1);
        } else if (birthdayMonth == currentMonth) {
            const birthday = bday.getDate();
            const currentDay = today.getDate();
            if (birthday > currentDay) {
                bday.setFullYear(today.getFullYear());
            } else if (birthday < currentDay) {
                bday.setFullYear(today.getFullYear() + 1);
            } else if (birthday == currentDay) {
                return 0
            }
        }

        var distance = bday.getTime() - today.getTime();

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    getAge() {
        var bday = new Date(this.birthday);
        let today = new Date();

        var distance = today.getTime() - 
        bday.getTime();
        var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
        var yearsOld = ((daysOld/365).toFixed(0));
        
        return yearsOld
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const timeRemaining = this.getTimeRemaining(this.birthday)
            this.setState({ timeRemaining: timeRemaining})
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    renderMessage() {
        if (this.noBirthYear) {
            return (
                <h3>Remaining until your birthday!</h3>
            )
        } else {
            return (
            <h4>remaining until you are {this.getAge()}</h4>
            )
        }
    }

    
    render() {
        const data = this.state.timeRemaining

        return (
            <div>
                {
                   this.state.timeRemaining == 0 ?  
                        <div className="countdown">               
                            <div className="message-container">
                                <p className="message-container__title">Countdown Complete!</p>
                                <p className="message-container__message">HAPPY BIRTHDAY!!!</p>
                            </div>
                        </div> 
                        :
                        <div>
                            <div className="countdown">
                                <ul className="countdown__clock">
                                    <li>DAYS<p>{data.days}</p></li>
                                    <li>HRS<p>{data.hours}</p></li>
                                    <li>MINS<p>{data.minutes}</p></li>
                                    <li>SECS<p>{data.seconds}</p></li>
                                </ul>
                            </div>
                            <div className="until-container">
                                    {this.renderMessage()}
                            </div>
                        </div>
                }
                
            </div>
        )
    }
}


export default Clock;