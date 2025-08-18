function getImage(elem, size = 60) {
    return `<img src='images/${document.getElementById('dropdown_game').value}/${elem.name}.png' style='height:${size}px;width:${size}px'>`
}
function getGame() {
    return document.getElementById('dropdown_game').value
}