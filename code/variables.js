let allData
let filteredData
let globalGame
let globalArea
let globalCollection = 'all'
function generateAreaSelect() {
    let HTMLContent = ''
    HTMLContent = `<table id='areaSelectTable' class='shadow' style='margin-bottom:10px'>
    <tr class='text-shadow' style='font-family:var(--font2);color:gold;height:24px'>`
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