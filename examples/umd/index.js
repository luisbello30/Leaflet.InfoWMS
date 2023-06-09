const map = L.map('map1').setView([57.76, 11.96], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution:
        ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function tableData(data) {
    let title = document.getElementById('header')
    let detail = document.getElementById('detail')

    title.replaceChildren()
    detail.replaceChildren()

    for (const i in data) {
        if (data[i].properties) {
            let row = ''
            for (const prop in data[i].properties) {
                if (i === '0') {
                    title.innerHTML += `<th>${prop}</th>`
                }
                row += `<td>${data[i].properties[prop]}</td>`
            }
            detail.innerHTML += `<tr>${row}</tr>`
        }
    }
}

const wmsLyer = L.tileLayer.infoWMS('https://public-mapservice.lf.goteborg.se/geoserver/LF_Externwebb/wms?', {
    layers: 'Utrustning',
    format: 'image/png',
    transparent: true,
    attribution: '<a href="https://goteborg.se/">Public Geoserver LF Goteborg City</a>',
    feature_count: 1,
}).addTo(map);

wmsLyer.on('click', function(e) {
    console.log(e)
    fetch(e.url)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            tableData(response.features)
        });
})
