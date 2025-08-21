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
    HTMLContent += `<div class='container' style='font-size:150%'>${elem.name}</div>`
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
        content += `<div style='${areaObject.type == 'area' ? 'color:gold;' : ''}font-size:150%;padding:0 5px'>${areaObject?.name}</div>`
        content += `</div>`
        HTMLContent += boardTitleCell(className, content)
    }
    document.getElementById('boardTitle').innerHTML = boardTitleWrapper(HTMLContent)
    if (globalArea != 'all') {
        show('closeBoardTitle')
    } else {
        hide('closeBoardTitle')
    }
}
function generateAreaSelect() {
    let HTMLContent = ''
    HTMLContent = `<table id='areaSelectTable' class='shadow' style='margin-bottom:10px'>
    <tr style='color:gold;height:24px'>`
    areaSet[globalGame].forEach(area => {
        if (area.type == 'area') {
            HTMLContent += `<td id='area_${area.id}Button' class='${area.id} grow' style='padding:0 10px;min-width:170px' colspan=${area.num} onclick="changeArea('${area.id}')">${area.name}</td>`
        }
    })
    HTMLContent += `<td id='area_allButton' rowspan=2 class='grow' style='background-color:mediumpurple;padding:0 10px' onclick="changeArea('all')">ALL</td>`
    HTMLContent += `</tr>`
    if (globalGame == 2) {
        HTMLContent += `<tr>`
        areaSet[2].forEach(area => {
            if (area.type == 'cave') {
                HTMLContent += `<td id='area_${area.id}Button' class='${area.area} grow' onclick="changeArea('${area.id}')">${getAreaIcon(area)}</td>`
            }
        })
        HTMLContent += `</tr>`
    }
    document.getElementById('areaSelect').innerHTML = HTMLContent
}
function buttonClick2(pressed, unpressed, className) {
    document.querySelectorAll('#' + unpressed + ' td').forEach(button => {
        button.classList.remove(className)
    })
    const button = document.getElementById(pressed)
    button?.classList.add(className)
}