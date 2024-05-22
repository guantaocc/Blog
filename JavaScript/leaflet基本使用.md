# leaflet

## leaflet初始化

```js
import 'leaflet/dist/leaflet.css'
import * as $L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'

// 设置图标
let DefaultIcon = $L.icon({
  iconAnchor: [13, 41],
  iconUrl: icon,
  shadowUrl: iconShadow
})
$L.Marker.prototype.options.icon = DefaultIcon
```

## 加载底图


### 加载天地图影像底图和注记图

** 需要提前从天地图申请token **

```js

let map = $L.map(divId, {
  center: [39.842338, 115.494101],
  zoom: 4,
  maxZoom: 18,
  minZoom: 2,
  attribution: '',
  preferCanvas: true
})

const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options)
  tileLayer.addTo(map)
  return tileLayer
}

let url = 'http://t{s}.tianditu.gov.cn/img_w/wmts?tk=${你的token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
let mector_zh = 'http://t{s}.tianditu.gov.cn/cia_w/wmts?tk=${你的token}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',

// 添加影像图
createTileLayer(this.map, this.url, {
  tileSize: 256, // 地图瓦片的尺寸
  attribution: 'tianditu',
  subdomains: [0, 1, 2, 3, 4, 5, 6, 7]
})
// 添加注记图
createTileLayer(this.map, this.mector_zh, {
  attribution: 'tianditu',
  subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
  transparent: true,
  zIndex: 3
})
```
