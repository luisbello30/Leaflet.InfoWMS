import { Map } from 'leaflet';
import { TileLayer } from 'leaflet-infowms';
import 'leaflet/dist/leaflet.css';
// import { TileLayer } from '../../dist/Leaflet.InfoWMS.esm';

const map = new Map('mapa');
const osmUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const osm = new TileLayer(osmUrl, {
    attribution:
        ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const nexrad = new TileLayer.InfoWMS('https://public-mapservice.lf.goteborg.se/geoserver/LF_Externwebb/wms?', {
    layers: 'Utrustning',
    format: 'image/png',
    transparent: true,
    attribution: 'Public Geoserver LF Goteborg City',
    feature_count: 2,
    callBack
});

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

function callBack(url, params, point) {
    console.log(url)
    console.log(params)
    console.log(point)
    fetch(url)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            tableData(response.features)
        });
}

map.addLayer(osm)
    .addLayer(nexrad)
    .setView([57.76, 11.96], 12);