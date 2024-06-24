# 杂记


## 加载4490坐标系问题

### 定义epsg: 4490（国家地理2000坐标系）

定义可以去 [**epsg网站**](https://epsg.io/?q=4490) 查询

```ts
let CRS_4490 = new $L.Proj.CRS('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs', {
  resolutions: [
    1.40625,
    0.703125,
    0.3515625,
    0.17578125,
    0.087890625,
    0.0439453125,
    0.02197265625,
    0.010986328125,
    0.0054931640625,
    0.00274658203125,
    0.001373291015625,
    6.866455078125e-4,
    3.4332275390625e-4,
    1.71661376953125e-4,
    8.58306884765625e-5,
    4.291534423828125e-5,
    2.1457672119140625e-5,
    1.0728836059570312e-5,
    5.364418029785156e-6,
    2.682209064925356e-6,
    1.3411045324626732e-6
  ],
  origin: [-180, 90],
  bounds: $L.bounds([-180, -90], [180, 90])
  // bounds: $L.bounds([117.75370429660006, 26.99449191557761], [123.63262097540007, 32.2668788575695])
  // 这里可以有origin、transformation、scales、resulutions、bounds几个参数提供
  // 选择，其中scales与resolutions不能同时配置
})
```

### 修改tileLayer-url

```ts
  url:
        'https://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=030e0ed17677a95129072c03f6c0fb6c',
      mector_zh:
        'https://t0.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=030e0ed17677a95129072c03f6c0fb6c',
```

![image-20240621155334704](https://raw.githubusercontent.com/guantaocc/picgo/master/images/202406211553930.png)

### 切片

XYZ切片，切片通常为256px*256px

![image-20240621161854529](https://raw.githubusercontent.com/guantaocc/picgo/master/images/202406211618691.png)

### 投影坐标系

投影坐标系 = 大地坐标系 + 投影方法

web mector(墨卡托): epsg:3857

GCS2000(国家大地坐标系)

PCS(投影坐标系)

### kernal

