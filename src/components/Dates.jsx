import React from 'react'
import back from "../assets/static/back.svg";
import next from "../assets/static/next.svg";

import "../assets/styles/Dates.scss";

const Dates = ({
    clickDate,
    month,
    year,
    total,
    list,
    before,
    after,
    monthBefore,
    day,
    clickNext,
    clickBack }) => {

    const monthList = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agtosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]

    const _nodes = new Map()
    let firstElement

    const items = [];

    const handleClick = (e, i) => {
        const first = _nodes.get(firstElement)
        first.classList.remove('Calendar__daysOfMonth--check')
        const node = _nodes.get(i)
        clickDate(i, node)
    }

    const component = (i, nameClass) => {
        return <div
            key={list[i - 1].localDate}
            className={nameClass}
            onClick={e => handleClick(e, i)}
            ref={c => _nodes.set(i, c)}
            value={i}>
            <button>
                {i}
            </button>
        </div>

    }

    if (list.length) {
        for (let i = before; i >= 0; i--) {
            items.push(
                <h5 key={i * 5 + 12} className="Calendar__daysOfMonth--daysOff">
                    {monthBefore - i}
                </h5>
            );
        }
        for (let i = 1; i <= total; i++) {
            if (day === i) {
                const c = component(i, "Calendar__daysOfMonth--days Calendar__daysOfMonth--check")
                items.push(c);
                firstElement = i
            } else {
                items.push(component(i, "Calendar__daysOfMonth--days"));
            }
        }

        for (let i = 1; i <= after; i++) {
            items.push(<h5 key={i * 5} className="Calendar__daysOfMonth--daysOff">{i}</h5>);
        }
    }

    return (
        <div className="Calendar__dates">
            <div className="Calendar__title">
                <img src={back} alt="" onClick={clickBack} />
                <h3>{monthList[month]} {year}</h3>
                <img src={next} alt="" onClick={clickNext} />
            </div>
            <div className="Calendar__datesPicker">
                <div className="Calendar__daysOfMonth">
                    <h5 className="Calendar__daysOfMonth--text">D</h5>
                    <h5 className="Calendar__daysOfMonth--text">L</h5>
                    <h5 className="Calendar__daysOfMonth--text">M</h5>
                    <h5 className="Calendar__daysOfMonth--text">M</h5>
                    <h5 className="Calendar__daysOfMonth--text">J</h5>
                    <h5 className="Calendar__daysOfMonth--text">V</h5>
                    <h5 className="Calendar__daysOfMonth--text">S</h5>
                    {items}
                </div>
                <div className="Calendar__dates--button">
                    Aceptar
                </div>
            </div>
        </div>
    )
}

export default Dates