let allData
let filteredData
const areaSet = {
    1: ["The Impact Site", "The Forest of Hope", "The Forest Navel", "The Distant Spring", "The Final Trial"],
    2: [
        ['Valley of Repose', 'Emergence Cave', 'Subterranean Complex', 'Frontier Cavern'],
        ['Awakening Wood', 'Hole of Beasts', 'White Flower Garden', 'Bulblax Kingdom', 'Snagret Hole'],
        ['Perplexing Pool', 'Citadel of Spiders', "Glutton's Kitchen", 'Shower Room', 'Submerged Castle'],
        ['Wistful Wild', 'Cavern of Chaos', 'Hole of Heroes', 'Dream Den']
    ]
}
let areaIDs
function generateAreaDropdown() {
    const game = document.getElementById('dropdown_game').value
    const areas = areaSet[game]
    if (game == 1) {
        areaIDs = removeSpacesAndLowercase(areas)
    } else {
        areaIDs = []
        areas.forEach(subArea => {
            areaIDs.push(removeSpacesAndLowercase(subArea))
        })
        console.log(areaIDs)
    }
    let HTMLContent = `<option value='all' selected>All</option>`
    areas.forEach((area, index) => {
        if (game == 1) {
            HTMLContent += `<option value='${areaIDs[index]}'>${area}</option>`
        } else {
            area.forEach((subArea, index2) => {
                let spacer = index2 == 0 ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;'
                HTMLContent += `<option value='${areaIDs[index][index2]}'>${spacer + subArea}</option>`
            })
        }
    })
    document.getElementById('dropdown_area').innerHTML = HTMLContent
}
generateAreaDropdown()
function removeSpacesAndLowercase(arr) {
    return arr.map(str => str.replace(/[\s']/g, '').toLowerCase());
}