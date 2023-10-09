export function hasConflict(classes, selected) {
    let res = []
    for (let i = 0; i < selected.length; i++) {
        let selectedTerm = selected[i].split(";")[0]
        let selectedMeets = selected[i].split(";")[3]
        classes.forEach(course => {
            let key = course.term + ";" + String(course.number) + ";" + course.title + ";" + course.meets
            if (key == selected[i]) return
            if (checkTerm(course.term, selectedTerm) && checkDay(course.meets.split(" ")[0], selectedMeets.split(" ")[0])) {
                if (checkTime(course, selected[i])) {
                    res.push(key)
                }
            }
        })
    }

    return res
}
const checkTerm = (term1, term2) => term1 === term2

function checkDay(days1, days2) {

    if (days1 == days2) return true
    if (days1.includes("M") && days2.includes("M")) return true
    if (days1.includes("Tu") && days2.includes("Tu")) return true
    if (days1.includes("W") && days2.includes("W")) return true
    if (days1.includes("Th") && days2.includes("Th")) return true
    if (days1.includes("F") && days2.includes("F")) return true
    return false
}

function checkTime(class1, class2) {
    // meets; MWF 12;00-13;50
    // class1; {term, meets}
    // class2; "term;number;title;meets"
    let time1 = class1.meets.split(" ")[1]
    let time2 = class2.split(";")[3].split(" ")[1]
    if (time1 == time2) {
        return true;
    }
    let start1 = time1.split("-")[0]
    let start2 = time2.split("-")[0]
    let end1 = time1.split("-")[1]
    let end2 = time2.split("-")[1]

    if (start1 == start2 || end1 == end2 || start1 == end2 || start2 == end1) { return true }


    let start1Hour = parseInt(start1.split(":")[0])
    let start1Min = parseInt(start1.split(":")[1])
    let start2Hour = parseInt(start2.split(":")[0])
    let start2Min = parseInt(start2.split(":")[1])
    let end1Hour = parseInt(end1.split(":")[0])
    let end1Min = parseInt(end1.split(":")[1])
    let end2Hour = parseInt(end2.split(":")[0])
    let end2Min = parseInt(end2.split(":")[1])

    if (start1Hour < start2Hour && end1Hour > start2Hour) return true
    if (start1Hour == start2Hour && start1Min < start2Min) return true
    if (start1Hour > start2Hour && start1Hour < end2Hour) return true
    if (start1Hour == end2Hour && start1Min < end2Min) return true
    if (end1Hour > start2Hour && end1Hour < end2Hour) return true
    if (end1Hour == end2Hour && end1Min > end2Min) return true
    return false

}