gapi.load('client', () => loadClient(true));
setFooter('2025')
setTabs(['home', 'ballpit'])
initializeHash('ballpit')
setSidebar(generateSidebar())
    .then(() => {
        changeGame(2, true)
    })
const fontAwesomeSet = {
    home: ['Home', 'home'],
    ballpit: ['Ballpit', 'smile-o']
}
function generateSidebar() {
    let HTMLContent = ''
    for (i = 1; i <= 3; i++) {
        HTMLContent += `<div class="container grow banner" style='width:100%' onclick="changeGame(${i})"><img src="images/logo/${i}.png"></div>`
    }
    return HTMLContent
}
function processData(data) {
    allData = convertToObjects(data)
    allData.forEach((elem, index) => {
        elem.index = index
        const areas = areaSet[globalGame]
        areas.forEach(area => {
            if (elem[area.id]) elem[area.id] = elem[area.id].split(',')
        })
        elem.total = 0
        areas.forEach(area => {
            const array = elem[area.id]
            if (array) {
                elem.total += math.sum(array)
            }
        })
    })
    generateAreaSelect()
    changeArea(globalArea)
    changeCollection(globalCollection)
    showTab(globalTab)
}
function changeGame(game, stop) {
    range = game + '!A:Z'
    globalGame = game
    globalArea = 'all'
    document.getElementById('sidebarLogo').src = `images/logo/${globalGame}.png`
    if (!stop) fetchData()
}
function changeArea(area) {
    globalArea = area
    buttonClick2('area_' + globalArea + 'Button', 'areaSelectTable', 'selected')
    action()
}
function changeCollection(collection) {
    globalCollection = collection
    buttonClick(globalCollection + 'Button', 'collections', 'activeBanner')
    action()
}
function action() {
    updateBoardTitle()
    filteredData = allData
    if (globalArea != 'all') {
        filteredData = filteredData.filter(elem => elem[globalArea])
    }
    if (globalCollection == 'piklopedia') {
        filteredData = filteredData.filter(elem => elem.type == 'e')
    } else if (globalCollection == 'treasure') {
        filteredData = filteredData.filter(elem => elem.type == 't')
    } else if (globalCollection == 'candypop') {
        filteredData = filteredData.filter(elem => elem.type == 'c')
    }
    switch (globalTab) {
        case 'home':
            generateHome()
            break;
        case 'ballpit':
            generateBallpit()
            break;
    }
}
function generateHome() {
    let HTMLContent = `<div class='container' style="padding-top:10px;gap:30px;align-items: flex-start;">`
    HTMLContent += `<table class='shadow'>`
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
            HTMLContent += `</table><table class='shadow'>`
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