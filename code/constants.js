const sheetId = '1lfrxd3tuh_oUEjGMzA_hQ2b693f5tbCRVOS_X3zFVKE'
const areaSet = {
    1: ["The Impact Site", "The Forest of Hope", "The Forest Navel", "The Distant Spring", "The Final Trial"],
    2: [
        { name: "Valley of Repose", type: "area", num: 3 },
        { name: "Emergence Cave", type: "cave", icon: 'candypop/Violet Candypop Bud' },
        { name: "Subterranean Complex", type: "cave", icon: 'piklopedia/Man-at-Legs' },
        { name: "Frontier Cavern", type: "cave", icon: 'piklopedia/Bulborb Larva' },

        { name: "Awakening Wood", type: "area", num: 4 },
        { name: "Hole of Beasts", type: "cave", icon: 'piklopedia/Empress Bulblax' },
        { name: "White Flower Garden", type: "cave", icon: 'candypop/Ivory Candypop Bud' },
        { name: "Bulblax Kingdom", type: "cave", icon: 'piklopedia/Emperor Bulblax' },
        { name: "Snagret Hole", type: "cave", icon: 'piklopedia/Burrowing Snagret' },

        { name: "Perplexing Pool", type: "area", num: 4 },
        { name: "Citadel of Spiders", type: "cave", icon: 'piklopedia/Beady Long Legs' },
        { name: "Glutton's Kitchen", type: "cave", icon: 'piklopedia/Giant Breadbug' },
        { name: "Shower Room", type: "cave", icon: 'piklopedia/Ranging Bloyster' },
        { name: "Submerged Castle", type: "cave", icon: 'piklopedia/Waterwraith' },

        { name: "Wistful Wild", type: "area", num: 3 },
        { name: "Cavern of Chaos", type: "cave", icon: 'piklopedia/Segmented Crawbster' },
        { name: "Hole of Heroes", type: "cave", icon: 'piklopedia/Raging Long Legs' },
        { name: "Dream Den", type: "cave", icon: 'piklopedia/Titan Dweevil' }
    ],
    3: ["Tropical Wilds", "Garden of Hope", "Distant Tundra", "Twilight River", "Formidable Oak"],
}
areaSet[1].forEach((area, index) => {
    areaSet[1][index] = { name: area, id: removeSpacesAndLowercase(area), area: removeSpacesAndLowercase(area), type: "area" }
})
let current
areaSet[2].forEach(area => {
    area.id = removeSpacesAndLowercase(area.name)
    if (area.type == 'area') current = area.id
    area.area = current
})
areaSet[3].forEach((area, index) => {
    areaSet[3][index] = { name: area, id: removeSpacesAndLowercase(area), area: removeSpacesAndLowercase(area), type: "area" }
})