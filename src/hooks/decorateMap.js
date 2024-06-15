// import { usePointStore } from '@/stores/points'
// const pointStore = usePointStore()

// 显示存有物资的点位
const getMarkers = (AMap, map, allPointPosition) => {
    allPointPosition.forEach((point) => {
        // 创建 Marker 实例
        if (!point.available) {
            return;
        }

        var marker = new AMap.Marker({
            position: new AMap.LngLat(point.position[0], point.position[1]),
            title: point.name,
        });

        // 将 Marker 实例添加至地图
        map.add(marker);
    });
}
// 绘制路径折线
const getLine = (AMap, map, oneRouteArray) => {
    // routeArray为数组，其中的元素为列表类型，存储了路径的经纬度信息
    var path = [
        new AMap.LngLat(oneRouteArray[0].Lng, oneRouteArray[0].Lat),
        new AMap.LngLat(oneRouteArray[1].Lng, oneRouteArray[1].Lat),
    ];

    // 创建 Polyline 实例
    var polyline = new AMap.Polyline({
        path: path,
        strokeWeight: 2, //线条宽度
        strokeColor: "blue", //线条颜色
        lineJoin: "round", //折线拐点连接处样式
    });

    // 将折线添加至地图实例
    map.add(polyline);
}

export { getMarkers, getLine };
