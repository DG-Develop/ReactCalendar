import React from "react";
import Dates from "./Dates";

import "../assets/styles/Calendar.scss";
import HeaderDate from "./HeaderDate";

class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      day: "",
      element: undefined,
      today: new Date(),
      dayOfMonth: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      totalOfMonth: 0,
      daysList: [],
      daysFillBefore: 0,
      daysFillAfter: 0,
      monthBefore: 0,
      day: 0
    }

    this.monthList = [
      "EN.",
      "FEB.",
      "MAR.",
      "ABR.",
      "MAY.",
      "JUN.",
      "JUL.",
      "AGTO.",
      "SEPT.",
      "OCT.",
      "NOV.",
      "DIC."
    ]
    
    this.handleClickDate = this.handleClickDate.bind(this)
    this.handleNextDate = this.handleNextDate.bind(this)
    this.handleBackDate = this.handleBackDate.bind(this)
  }

  componentDidMount() {
    this.getData(this.state.today)   
  }

  getData(date) {
    const day = date.getDate()

    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const totalDaysBefore = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    const dayOfWeekList = []
    const dayMonth = new Date(
      date.getFullYear(), 
      date.getMonth(),
      day
    )

    for (let day = 1; day <= totalDays; day++) {
      const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), day).getDay()
      const localDate = new Date(date.getFullYear(), date.getMonth(), day).toLocaleDateString()
      dayOfWeekList.push({ dayOfWeek, day, localDate })
    }

    const before = dayOfWeekList[0].dayOfWeek - 1
    // calcular las condiciones que cuando sea 6 rellene todos los espacios de la siguiente fila
    // y cuando sea 0 que solo rellen 6 valores
    const after = 6 - dayOfWeekList[dayOfWeekList.length - 1].dayOfWeek;

    (after === 0) ? 6 : after

    this.setState({ 
      totalOfMonth: totalDays,
      daysList: dayOfWeekList,
      daysFillBefore: before,
      daysFillAfter: after,
      monthBefore: totalDaysBefore,
      day: day,
      today: date,
      month: date.getMonth(),
      year: date.getFullYear(),
      dayOfMonth: dayMonth.getDay()
    })
  }

  putStyle(element) {
    element.classList.add('Calendar__daysOfMonth--check')
    this.setState({ element: element })
  }

  removeStyle() {
    this.state.element.classList.remove('Calendar__daysOfMonth--check')
    this.setState({ element: undefined })
  }

  handleNextDate() {
    const newDate = new Date()
    if (this.state.month === 11) {
      newDate.setMonth(0)
      newDate.setFullYear(this.state.year + 1)
      this.getData(newDate)
    } else {
      newDate.setMonth(this.state.month + 1)
      newDate.setFullYear(this.state.year)
      this.getData(newDate)
    }
  }

  handleBackDate() {
    const newDate = new Date()
    if (this.state.month === 0) {
      newDate.setMonth(11)
      newDate.setFullYear(this.state.year - 1)
      this.getData(newDate)
    } else {
      newDate.setMonth(this.state.month - 1)
      newDate.setFullYear(this.state.year)
      this.getData(newDate)
    }
  }

  handleClickDate(value, element) {
    if (this.state.element) {
      this.removeStyle()
      this.putStyle(element)
    } else {
      this.putStyle(element)

    }

    this.getDayAndDayOfMonth(value)
  }

  getDayAndDayOfMonth(day){
      const date = new Date(
        this.state.year, 
        this.state.month,
        day
      )

      const result = date.getDay()

      this.setState({ day: day, dayOfMonth: result })
  }

  render() {
    return (
      <div className="Calendar">
        <div className="Calendar__container">
          
          <HeaderDate 
            dayofMonth={this.state.dayOfMonth}
            day={this.state.day}
            month={this.state.month}
            year={this.state.year}
            list={this.monthList}
          />

          <Dates
            clickDate={this.handleClickDate}
            month={this.state.month}
            year={this.state.year}
            total={this.state.totalOfMonth}
            list={this.state.daysList}
            before={this.state.daysFillBefore}
            after={this.state.daysFillAfter}
            monthBefore={this.state.monthBefore}
            day={this.state.day}
            clickNext={this.handleNextDate}
            clickBack={this.handleBackDate}
          />
        </div>
      </div>
    );
  }


};

export default Calendar;
