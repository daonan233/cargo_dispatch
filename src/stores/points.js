import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePointStore = defineStore('point', () => {
  const availablePoint = ref(['哈尔滨', '长春', '沈阳', '乌鲁木齐', '呼和浩特', '北京', '银川', '太原', '济南',
    '西安', '郑州', '成都', '重庆', '武汉', '南京', '上海', '杭州', '长沙', '昆明', '福州']);  // 可用物资点位数组（名称）

  // 所有物资点位详细信息数组（点位、资源数、是否可用）
  const allPointPosition = ref([
    {
      name: '哈尔滨',
      position: [126.6425, 45.757],
      // 该点位的物资资源详情
      resourceDetail: {
        'resourceA': 100,
        'resourceB': 20,
        'resourceC': 0,
      },
      // 该点位是否可用
      available: true,
    },
    {
      name: '长春',
      position: [125.3245, 43.8868],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '沈阳',
      position: [123.4647, 41.6775],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '乌鲁木齐',
      position: [87.564988, 43.84038],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '呼和浩特',
      position: [111.75199, 40.84149],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '北京',
      position: [116.4074, 39.9042],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '银川',
      position: [106.231, 38.4878],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '太原',
      position: [112.5497, 37.8705],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '济南',
      position: [117.1201, 36.6527],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '西安',
      position: [108.9396, 34.3432],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '郑州',
      position: [113.6581, 34.7458],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '成都',
      position: [104.0663, 30.573],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '重庆',
      position: [106.5505, 29.5637],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '武汉',
      position: [114.3046, 30.5934],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '南京',
      position: [118.7967, 32.0593],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '上海',
      position: [121.4737, 31.2305],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '杭州',
      position: [120.1536, 30.2875],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '长沙',
      position: [112.9823, 28.1941],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    {
      name: '昆明',
      position: [102.7123, 25.0406],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },  {
      name: '福州',
      position: [119.3062, 26.0753],
      resourceDetail: {
        'resourceA': 0,
        'resourceB': 0,
        'resourceC': 0,
      },
      available: true,
    },
    
  ])
  const transferResources = (startCity, endCity, resource, quantity) => {
    // 找到起始城市和结束城市的详细信息
    const startPoint = allPointPosition.value.find(point => point.name === startCity);
    const endPoint = allPointPosition.value.find(point => point.name === endCity);

    if (!startPoint || !endPoint) {
      throw new Error('起始城市或结束城市不存在');
    }
    // 检查起始城市是否有足够的资源
    if (startPoint.resourceDetail[resource] < quantity) {
      throw new Error('起始城市资源不足');
    }
    // 减少起始城市的资源
    startPoint.resourceDetail[resource] -= quantity;
    // 增加结束城市的资源
    endPoint.resourceDetail[resource] += quantity;
  };

  return {
    availablePoint,
    allPointPosition,
    transferResources,
  };
  // 修改可用物资点位（添加、删除）
  const changeAvailablePoint = (operation, point) => {
    // 判断操作是添加还是删除
    if (operation === 'add') {
      // 从可用物资点位数组中添加点位
      availablePoint.value.push(point)

      // 从所有物资点位详细信息数组中设置点位为可用
      allPointPosition.value.forEach((item) => {
        if (item.name === point) {
          item.available = true
        }
      })
    } else if (operation === 'delete') {
      // 从可用物资点位数组中删除点位
      availablePoint.value = availablePoint.value.filter((item) => item !== point)

      // 从所有物资点位详细信息数组中设置点位为不可用
      allPointPosition.value.forEach((item) => {
        if (item.name === point) {
          item.available = false
        }
      })
    }
  }

  return { availablePoint, allPointPosition, changeAvailablePoint }
})

export const allPointPosition = ref([
  {
    name: '哈尔滨',
    position: [126.6425, 45.757],
    // 该点位的物资资源详情
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    // 该点位是否可用
    available: true,
  },
  {
    name: '长春',
    position: [125.3245, 43.8868],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '沈阳',
    position: [123.4647, 41.6775],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '乌鲁木齐',
    position: [87.564988, 43.84038],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '呼和浩特',
    position: [111.75199, 40.84149],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '北京',
    position: [116.4074, 39.9042],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '银川',
    position: [106.231, 38.4878],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '太原',
    position: [112.5497, 37.8705],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '济南',
    position: [117.1201, 36.6527],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '西安',
    position: [108.9396, 34.3432],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '郑州',
    position: [113.6581, 34.7458],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '成都',
    position: [104.0663, 30.573],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '重庆',
    position: [106.5505, 29.5637],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '武汉',
    position: [114.3046, 30.5934],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '南京',
    position: [118.7967, 32.0593],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '上海',
    position: [121.4737, 31.2305],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '杭州',
    position: [120.1536, 30.2875],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '长沙',
    position: [112.9823, 28.1941],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '昆明',
    position: [102.7123, 25.0406],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
  {
    name: '福州',
    position: [119.3062, 26.0753],
    resourceDetail: {
      'resourceA': 0,
      'resourceB': 0,
      'resourceC': 0,
    },
    available: true,
  },
])
