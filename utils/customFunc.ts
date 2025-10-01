import { attendanceInterface } from "../types/attendance.type";


export const getChartData = (data : attendanceInterface[]) => {

    interface dataInterface {
        date : string,
        totalAbsent : number,
        totalPresent : number
    }

    const allDate = data.map((item) => item.date)
    const listOfDate = [...new Set(allDate)];

    let chartData : dataInterface[] = []

    listOfDate.forEach((date) => {
        let totalPresent = 0
        let totalAbsent= 0
        data.forEach((item) => {
            if(item.date == date){
                switch(item.status){
                    case "present":
                        totalPresent += 1
                    break;

                    case "absent":
                        totalAbsent += 1
                    break;
                }
            }
        })
        chartData.push({date, totalPresent, totalAbsent})
    })

    return chartData
}


export const getPiechartData = (data : attendanceInterface[]) => {
    let totalPresent = 0
    let totalAbsent= 0

    data.forEach((item) => {
         switch(item.status){
            case "present":
                totalPresent += 1
            break;

            case "absent":
                totalAbsent += 1
            break;
        }
    })

    const pieChartData = {
        present : totalPresent,
        absent : totalAbsent
    }

    return pieChartData
}