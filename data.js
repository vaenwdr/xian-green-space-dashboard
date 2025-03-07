// 示例数据，您需要根据实际情况修改
const mapData = {
    // 城市边界GeoJSON数据
    cityBoundary: {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "西安市中心城区"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [108.9, 34.2],
                            [109.0, 34.2],
                            [109.0, 34.3],
                            [108.9, 34.3],
                            [108.9, 34.2]
                        ]
                    ]
                }
            }
        ]
    },
    
    // 详细规划单元数据
    units: [
        {
            id: "LH-07",
            name: "LH-07单元",
            geometry: { // GeoJSON格式
                "type": "Polygon",
                "coordinates": [
                    [
                        [108.94, 34.24],
                        [108.95, 34.24],
                        [108.95, 34.25],
                        [108.94, 34.25],
                        [108.94, 34.24]
                    ]
                ]
            },
            characteristics: {
                area: 72.5,
                population: 3.2,
                greenArea: 12.3,
                greenPerCapita: 3.8,
                parkCoverage: 40.2,
                sizeData: {
                    labels: ["现状绿地", "居住用地", "商业用地", "工业用地", "道路用地", "其他用地"],
                    values: [15, 40, 15, 5, 15, 10]
                },
                populationData: {
                    labels: ["老年人口", "中青年人口", "儿童人口", "流动人口"],
                    values: [20, 55, 15, 10]
                }
            },
            risks: {
                type: "Ⅰ型多重高风险",
                level: "高风险",
                riskData: {
                    labels: ["热岛风险", "内涝风险", "空气污染风险", "休闲游憩不足"],
                    values: [4.2, 3.7, 4.1, 3.9]
                },
                supplyDemandData: {
                    labels: ["热岛调节", "雨洪调节", "空气净化", "游憩服务"],
                    supply: [2.1, 2.3, 2.0, 1.8],
                    demand: [4.2, 3.8, 4.0, 3.9]
                }
            },
            control: {
                indicators: {
                    greenRatio: {
                        target: 35,
                        current: 25,
                        gap: -10
                    },
                    parkCoverage: {
                        target: 85,
                        current: 40.2,
                        gap: -44.8
                    },
                    connectivity: {
                        target: 0.6,
                        current: 0.3,
                        gap: -0.3
                    }
                },
                structureRequirements: "该单元需落实一条二级生态廊道，连接汉城湖遗址公园与环城公园。廊道宽度不小于15米，需结合现有绿地和公园整合构建，并考虑立体绿化增加垂直绿量。"
            },
            optimization: {
                strategy: "1. 通过公共绿地扩建、屋顶绿化和垂直绿化增加绿量，重点缓解热岛问题；\n2. 结合雨水花园、下沉式绿地等措施提升雨洪调节能力；\n3. 沿规划廊道设置连续步行系统，提升居民休闲游憩空间可达性；\n4. 街道绿化时选择降尘能力强的植物，缓解空气污染问题。",
                effectData: {
                    labels: ["热岛风险", "内涝风险", "空气污染风险", "休闲游憩不足"],
                    before: [4.2, 3.7, 4.1, 3.9],
                    after: [2.1, 1.8, 2.2, 1.9]
                },
                imageUrl: null // 实际项目中需提供图片URL
            }
        }
        // 可以添加更多单元数据...
    ]
};
