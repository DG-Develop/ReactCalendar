import {useState, useEffect} from 'react';

const useInitialState = (date) => {
    const [daysOfMonth, setDaysOfMonth] = useState({
        daysList: [],
        daysFillBefore: 0,
        daysFillAfter: 0,
        monthBefore: 0,
        totalOfMonth: 0,
        today: 0,
    })

    useEffect(() => {
        const day = date.getDate()

        const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        const totalDaysBefore = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        const dayOfWeekList = []

        for (let day = 1; day <= totalDays; day++){
            const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), day).getDay()
            const localDate = new Date(date.getFullYear(), date.getMonth(), day).toLocaleDateString()
            dayOfWeekList.push({dayOfWeek, day, localDate})
        }

        const before = dayOfWeekList[0].dayOfWeek - 1
        // calcular las condiciones que cuando sea 6 rellene todos los espacios de la siguiente fila
        // y cuando sea 0 que solo rellen 6 valores
        const after = 6 - dayOfWeekList[dayOfWeekList.length - 1].dayOfWeek;
        
        (after === 0) ? 6 : after 
        
        setDaysOfMonth({ 
            daysList: dayOfWeekList,
            daysFillBefore: before,
            daysFillAfter: after,
            monthBefore: totalDaysBefore,
            totalOfMonth: totalDays,
            today: day,
        })
    }, [])

    return [daysOfMonth, setDaysOfMonth]
}

export default useInitialState;
