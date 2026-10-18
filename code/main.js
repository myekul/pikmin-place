setMyekulProjects('pikmin')
setFooter('2025')
setTabs(['home', 'sublevels', null, 'ballpit'])
initializeHash('ballpit')
setSidebar(generateSidebar())
    .then(() => {
        changeGame(2)
    })
function generateSidebar() {
    let HTMLContent = ''
    for (i = 1; i <= 3; i++) {
        HTMLContent += `<div class="container grow banner" style='width:100%' onclick="changeGame(${i})"><img src="images/logo/${i}.png"></div>`
    }
    return HTMLContent
}
function processData(data) {
    allData = data
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
function changeGame(game) {
    globalGame = game
    globalArea = 'all'
    document.getElementById('sidebarLogo').src = `images/logo/${globalGame}.png`
    loadData()
}
async function loadData() {
    const response = await fetch(`data/${globalGame}.csv`)
    const result = Papa.parse(await response.text(), { header: true, skipEmptyLines: true })
    processData(result.data)
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
    if (globalArea != 'all' && globalTab != 'sublevels') {
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
        case 'sublevels':
            generateSublevels()
            break;
        case 'ballpit':
            generateBallpit()
            break;
    }
}
