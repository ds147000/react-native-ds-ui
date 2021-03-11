// 用于生成日期数据结构
const fs = require("fs")
const { join } = require("path")

const DateJson = []
const YearJson = []
const MonthJson = [[], []]
const TimeJson = [[], []]
const DateTimeJson = [[], [], [], [], []]

let StartTime = 1970

const endTime = 2038

function getYearItem(year) {
    return {
        [year + "年"]: getMonth(year)
    }
}

function getMonth(year) {
    const month = []
    for (let i = 1; i < 13; i++) {
        let key = i + "月"
        if ([1, 3, 5, 7, 8, 10, 12].includes(i))
            month.push({
                [key]: getDay(31)
            })
        else if ([4, 6, 9, 11].includes(i))
            month.push({
                [key]: getDay(30)
            })
        else if (year % 100 !== 0 && year % 4 === 0)
            month.push({
                [key]: getDay(29)
            })
        else if (year % 400 === 0)
            month.push({
                [key]: getDay(29)
            })
        else
            month.push({
                [key]: getDay(30)
            })
    }
    return month
}

function getDay(max) {
    const arr = []
    for (let i = 1; i <= max; i++) {
        arr.push(i + "日")
    }
    return arr
}

while (StartTime <= endTime) {
    DateJson.push(getYearItem(StartTime))
    YearJson.push(StartTime + "年")
    DateTimeJson[0].push(StartTime + "年")
    MonthJson[0].push(StartTime + "年")
    StartTime += 1
}

for (let i = 1; i <= 12; i++) {
    DateTimeJson[1].push(i + "月")
    MonthJson[1].push(i + "月")
}
for (let i = 1; i <= 31; i++) {
    DateTimeJson[2].push(i + "日")
}
for (let i = 0; i <= 24; i++) {
    TimeJson[0].push(i + "时")
    DateTimeJson[3].push(i + "时")
}
for (let i = 0; i <= 60; i++) {
    TimeJson[1].push(i + "分")
    DateTimeJson[4].push(i + "分")
}

fs.writeFileSync(join(__dirname, "./date.json"), JSON.stringify(DateJson), { encoding: "utf-8" })
fs.writeFileSync(join(__dirname, "./time.json"), JSON.stringify(TimeJson), { encoding: "utf-8" })
fs.writeFileSync(join(__dirname, "./year.json"), JSON.stringify(YearJson), { encoding: "utf-8" })
fs.writeFileSync(join(__dirname, "./month.json"), JSON.stringify(MonthJson), { encoding: "utf-8" })
fs.writeFileSync(join(__dirname, "./datetime.json"), JSON.stringify(DateTimeJson), { encoding: "utf-8" })
