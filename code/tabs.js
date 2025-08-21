function generateHome() {
    let HTMLContent = `<div class='container' style="gap:30px;align-items: flex-start">`
    HTMLContent += `<table class='shadow background1'>`
    if (globalArea == 'all') {
        HTMLContent += `<tr class='sticky' style='top:150px'><td></td><td></td>`
        areaSet[globalGame].forEach(area => {
            HTMLContent += `<td class='${area.area} grow' onclick="changeArea('${area.id}')">${area.type == 'area' ? `<img src='images/map/${globalGame}/${area.id}.png' style='height:25px'>` : getAreaIcon(area, 30)}</td>`
            if (area.id == 'snagrethole') HTMLContent += `<td></td>`
        })
        HTMLContent += `</tr>`
    }
    let type = 'e'
    filteredData.forEach((elem, index) => {
        if (globalArea != 'all' && elem.type != type) {
            HTMLContent += `</table><table class='shadow background1'>`
        }
        type = elem.type
        const imgtd = `<td class='container'>${getImage(elem, 25)}</td>`
        HTMLContent += `<tr class='${getRowColor(index)} clickable' ${getOnclick(elem)}>
        <td style='text-align:right'>${elem.name}</td>
        ${imgtd}`
        if (globalArea == 'all') {
            areaSet[globalGame].forEach(area => {
                const content = math.sum(elem[area.id])
                HTMLContent += `<td class='${area.area}' style='min-width:40px;${content ? '' : 'filter:brightness(0.5)'}'>${content || ''}</td>`
                if (area.id == 'snagrethole') HTMLContent += imgtd
            })
            HTMLContent += imgtd
        } else {
            if (!(elem.type == 't' && globalGame == 2)) HTMLContent += `<td>x ${globalArea == 'all' ? elem.total : math.sum(elem[globalArea])}</td>`
        }
        HTMLContent += `</tr>`
    })
    HTMLContent += `</table>`
    document.getElementById('content').innerHTML = HTMLContent
}
function generateSublevels() {
    let HTMLContent = `<div style='overflow-x: auto'><table style='margin:0 auto'>`
    const areaObject = areaSet[globalGame].find(area => area.id == globalArea)
    if (globalArea == 'all' || areaObject?.type == 'area') {
        if (areaObject?.type == 'area') {
            HTMLContent += `<tr><td colspan=${areaObject.num}><div class='container sublevel' style='width:250px'>`
            filteredData.forEach(elem => {
                if (elem[globalArea]) {
                    for (let i = 0; i < elem[globalArea][0]; i++) {
                        HTMLContent += getImage(elem, 20, true)
                    }
                }
            })
            HTMLContent += `</div></td></tr>`
        }
        HTMLContent += `<tr>`
        areaSet[globalGame].forEach(area => {
            if (globalArea == 'all' || area.area == areaObject.id) {
                if (area.type == 'cave') {
                    HTMLContent += `
                <td class='${area.area} grow' style='padding:0 10px' onclick="changeArea('${area.id}')">
                    <div class='container' style='gap:8px'>
                        <div>${getAreaIcon(area, 42)}</div>
                        <div>${area.name}</div>
                    </div>
                </td>
                `
                }
            }
        })
        HTMLContent += `</tr>`
    }
    if (areaObject?.type == 'area') {
        for (let i = 0; i < 15; i++) {
            HTMLContent += `<tr>`
            areaSet[globalGame].forEach(area => {
                if (area.area == areaObject.id) {
                    console.log(area.id)
                    HTMLContent += getSublevel(area, i)
                }
            })
            HTMLContent += `</tr>`
        }
    } else if (areaObject?.type == 'cave') {
        for (let i = 0; i < areaObject.sublevels.length; i++) {
            HTMLContent += `<tr><td>${i + 1}</td>${getSublevel(areaObject, i)}</tr>`
        }
    } else {
        for (let i = 0; i < 15; i++) {
            HTMLContent += `<tr>`
            areaSet[globalGame].forEach(area => {
                HTMLContent += getSublevel(area, i)
            })
            HTMLContent += `</tr>`
        }
    }
    document.getElementById('content').innerHTML = HTMLContent
    function getSublevel(area, i) {
        let HTMLContent = ''
        if (area.type == 'cave') {
            HTMLContent += `<td class='${area.sublevels[i]}'><div class='sublevel'>`
            filteredData.forEach(elem => {
                if (elem[area.id]) {
                    for (let j = 0; j < elem[area.id][i]; j++) {
                        HTMLContent += getImage(elem, 20, true)
                    }
                }
            })
            HTMLContent += `</div></td>`
        }
        return HTMLContent
    }
}
function generateBallpit() {
    const uniqueElem = document.getElementById('checkbox_unique')
    if (globalArea == 'all') {
        changeArea(areaSet[globalGame][0].id)
    } else {
        let HTMLContent = ballpitRefresh()
        if (globalArea != 'all') {
            const areaObject = areaSet[globalGame].find(thisarea => thisarea.id == globalArea)
            if (areaObject.type == 'area') HTMLContent += `<div class='container no-select'><img src='images/map/${globalGame}/${globalArea}.png' style='padding-top:10px;height:330px;width:auto' draggable=false></div>`
        }
        HTMLContent += `<div id='ballpit'>`
        filteredData.forEach(elem => {
            if (uniqueElem.checked) {
                HTMLContent += addBallpit(elem)
            } else {
                if (globalArea == 'all') {
                    for (let i = 0; i < elem.total; i++) {
                        HTMLContent += addBallpit(elem)
                    }
                } else {
                    if (Array.isArray(elem[globalArea])) {
                        elem[globalArea].forEach(num => {
                            for (let i = 0; i < num; i++) {
                                HTMLContent += addBallpit(elem)
                            }
                        })
                    } else {
                        for (let i = 0; i < elem[globalArea]; i++) {
                            HTMLContent += addBallpit(elem)
                        }
                    }
                }
            }
        })
        HTMLContent += `</div>`
        document.getElementById('content').innerHTML = HTMLContent
        ballpitEngine(35, -50)
    }
    function addBallpit(elem) {
        let size = 50
        let dataSize
        if (elem.important) {
            size = 100
            dataSize = 85
        }
        if (elem.type == 't') {
            size = 60
            dataSize = 50
        }
        return `<div class='square' ${dataSize ? 'data-size=' + dataSize : ''}>${getImage(elem, size)}</div>`
    }
}