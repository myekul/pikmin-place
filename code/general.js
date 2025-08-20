function getImage(elem, size = 60, info) {
    let src
    switch (elem.type) {
        case 'e':
            src = 'piklopedia/' + elem.name
            break
        case 't':
            src = 'treasure/' + (globalGame == 2 ? elem.id : elem.name)
            break
        case 'c':
            src = 'candypop/' + elem.name
            break
    }
    let extra = ''
    if (info) extra = `class='grow' ${getOnclick(elem)}`
    return `<img src="images/${globalGame}/${src}.png" ${extra} style='height:${size}px;width:${size}px'>`
}
function removeSpacesAndLowercase(str) {
    return str.replace(/[\s']/g, '').toLowerCase();
}
function getAreaIcon(area, size = 40) {
    if (area.icon) return `<img src='images/${globalGame}/${area.icon}.png' class='container' style='height:${size}px;padding:0 3px'>`
    return ''
}
function openModalPikmin(elemIndex) {
    const elem = allData[elemIndex]
    let HTMLContent = `<div>`
    HTMLContent += `<div class='container'>${getImage(elem, 80)}</div>`
    HTMLContent += `<div class='container' style='font-family:var(--font2);font-size:150%'>${elem.name}</div>`
    HTMLContent += `</div>`
    openModal(HTMLContent, 'INFO')
}
function getOnclick(elem) {
    return `onclick="openModalPikmin(${elem.index})"`
}
function updateBoardTitle() {
    const areas = areaSet[globalGame]
    let HTMLContent = ''
    HTMLContent += boardTitleCell('banner', `<img src='images/logo/${globalGame}.png' class='container' style='height:40px;padding:2px 0'>`)
    if (globalArea != 'all') {
        const areaObject = areas.find(area => area.id == globalArea)
        const className = areaObject.area
        let content = `<div class='container'>`
        content += getAreaIcon(areaObject)
        content += `<div class='text-shadow' style='font-family:var(--font2);${areaObject.type == 'area' ? 'color:gold;' : ''}font-size:150%;padding:0 5px'>${areaObject?.name}</div>`
        content += `</div>`
        HTMLContent += boardTitleCell(className, content)
    }
    document.getElementById('boardTitle').innerHTML = boardTitleWrapper(HTMLContent)
}