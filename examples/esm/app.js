import { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TileLayer } from 'leaflet-infowms';
// import { TileLayer } from '../../dist/Leaflet.InfoWMS.esm';

const map = new Map('mapa');
const baseLayerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const baseLayer = new TileLayer(baseLayerUrl, {
    attribution:
        ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const wmsLayerUrl = 'https://public-mapservice.lf.goteborg.se/geoserver/LF_Externwebb/wms?'
const wmsLayer = new TileLayer.InfoWMS(wmsLayerUrl, {
        layers: 'Utrustning',
        format: 'image/png',
        transparent: true,
        attribution: 'Public Geoserver LF Goteborg City',
        feature_count: 1
    }
);

wmsLayer.on('click', function (e) {
    console.log(e);
    fetch(e.url)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            tableData(response.features);
        });
});

function tableData(data) {
    let title = document.getElementById('header');
    let detail = document.getElementById('detail');

    title.replaceChildren();
    detail.replaceChildren();

    for (const i in data) {
        if (data[i].properties) {
            let row = '';
            for (const prop in data[i].properties) {
                if (i === '0') {
                    title.innerHTML += `<th>${prop}</th>`;
                }
                row += `<td>${data[i].properties[prop]}</td>`;
            }
            detail.innerHTML += `<tr>${row}</tr>`;
        }
    }
}

map.addLayer(baseLayer).addLayer(wmsLayer).setView([57.76, 11.96], 12);
