setTitle('Pikmin Place')
setFooter('2025')
// setTabs(['home', 'ballpit'])
setTabs(['ballpit'])
initializeHash('home')
const fontAwesomeSet = {
    home: ['Home', 'home'],
    ballpit: ['Ballpit', 'smile-o']
}
const sheetId = '1lfrxd3tuh_oUEjGMzA_hQ2b693f5tbCRVOS_X3zFVKE'
let range = '1!A:Z'
gapi.load('client', () => loadClient(true));
function processData(data) {
    allData = convertToObjects(data)
    allData.forEach(elem => {
        if (getGame() == 2) {
            areaIDs.forEach(subArea => {
                subArea.forEach(sub => {
                    if (elem[sub]) elem[sub] = elem[sub].split(',')
                })
            })
        }
        elem.total = 0
        areaIDs.forEach(area => {
            if (getGame() == 2) {
                area.forEach(subArea => {
                    const array = elem[subArea]
                    if (array) {
                        elem[subArea].forEach(num => {
                            elem.total += parseInt(num)
                        })
                    }
                })
            } else {
                const num = elem[area]
                if (num) elem.total += parseInt(num)
            }
        })
    })
    showTab(globalTab)
}
function changeGame(game) {
    range = game + '!A:Z'
    generateAreaDropdown(game)
    fetchData()
}
function action() {
    const area = document.getElementById('dropdown_area').value
    filteredData = allData
    if (area != 'all') {
        filteredData = allData.filter(elem => elem[area])
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

}
function generateBallpit() {
    const areaElem = document.getElementById('dropdown_area')
    if (areaElem.value == 'all' && getGame() == 2) areaElem.value = 'valleyofrepose'
    const area = areaElem.value
    let HTMLContent = ballpitRefresh()
    if (getGame() == 1 && area != 'all') HTMLContent += `<div class='container'><img src='images/map/1/${area}.png' style='padding-top:50px;height:400px;width:auto'></div>`
    HTMLContent += `<div id='ballpit'>`
    filteredData.forEach(elem => {
        if (document.getElementById('checkbox_unique').checked) {
            HTMLContent += addBallpit(elem)
        } else {
            if (area == 'all') {
                for (let i = 0; i < elem.total; i++) {
                    HTMLContent += addBallpit(elem)
                }
            } else {
                if (Array.isArray(elem[area])) {
                    elem[area].forEach(num => {
                        for (let i = 0; i < num; i++) {
                            HTMLContent += addBallpit(elem)
                        }
                    })
                } else {
                    for (let i = 0; i < elem[area]; i++) {
                        HTMLContent += addBallpit(elem)
                    }
                }
            }
        }
    })
    HTMLContent += `</div>`
    document.getElementById('content').innerHTML = HTMLContent
    ballpitEngine(45)
}
function addBallpit(elem) {
    return `<div class='square' ${elem.boss ? 'data-size=100' : ''}>${getImage(elem, elem.boss ? 120 : 60)}</div>`
}