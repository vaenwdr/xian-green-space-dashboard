// 初始化地图
const map = L.map('map').setView([34.25, 108.95], 13);

// 添加底图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 添加城市边界
const cityBoundaryLayer = L.geoJSON(mapData.cityBoundary, {
    style: {
        color: '#1a73e8',
        weight: 2,
        fillColor: '#1a73e8',
        fillOpacity: 0.1
    }
}).addTo(map);

// 单元图层
let unitsLayer = L.layerGroup().addTo(map);

// 初始化图表
let sizeChart, populationChart, riskChart, supplyDemandChart, optimizationEffectChart;

// 初始化函数
function initCharts() {
    // 规模特征图表
    const sizeCtx = document.getElementById('size-chart').getContext('2d');
    sizeChart = new Chart(sizeCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '面积比例(%)',
                data: [],
                backgroundColor: [
                    '#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#FF5722', '#607D8B'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // 人口特征图表
    const populationCtx = document.getElementById('population-chart').getContext('2d');
    populationChart = new Chart(populationCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // 风险评估图表
    const riskCtx = document.getElementById('risk-chart').getContext('2d');
    riskChart = new Chart(riskCtx, {
        type: 'radar',
        data: {
            labels: [],
            datasets: [{
                label: '风险程度',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 5
                }
            }
        }
    });
    
    // 供需匹配图表
    const supplyDemandCtx = document.getElementById('supply-demand-chart').getContext('2d');
    supplyDemandChart = new Chart(supplyDemandCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '供给',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                },
                {
                    label: '需求',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
    
    // 优化效果图表
    const optimizationEffectCtx = document.getElementById('optimization-effect-chart').getContext('2d');
    optimizationEffectChart = new Chart(optimizationEffectCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '优化前',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                },
                {
                    label: '优化后',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

// 加载单元数据
function loadUnits() {
    // 清除现有图层
    unitsLayer.clearLayers();
    
    // 添加单元图层
    mapData.units.forEach(unit => {
        const unitLayer = L.geoJSON({
            type: "Feature",
            properties: {
                id: unit.id,
                name: unit.name
            },
            geometry: unit.geometry
        }, {
            style: {
                color: '#FF9800',
                weight: 2,
                fillColor: '#FFC107',
                fillOpacity: 0.5
            }
        }).addTo(unitsLayer);
        
        // 绑定点击事件
        unitLayer.on('click', () => {
            selectUnit(unit.id);
        });
    });
    
    // 调整地图视图
    map.fitBounds(unitsLayer.getBounds());
}

// 选择单元
function selectUnit(unitId) {
    const unit = mapData.units.find(u => u.id === unitId);
    if (!unit) return;
    
    // 更新标题
    document.getElementById('selected-unit-title').textContent = unit.name;
    
    // 更新基础信息
    document.getElementById('unit-id').textContent = unit.id;
    document.getElementById('unit-area').textContent = unit.characteristics.area;
    document.getElementById('unit-population').textContent = unit.characteristics.population;
    document.getElementById('green-area').textContent = unit.characteristics.greenArea;
    document.getElementById('green-per-capita').textContent = unit.characteristics.greenPerCapita;
    
    // 更新规模特征图表
    sizeChart.data.labels = unit.characteristics.sizeData.labels;
    sizeChart.data.datasets[0].data = unit.characteristics.sizeData.values;
    sizeChart.update();
    
    // 更新人口特征图表
    populationChart.data.labels = unit.characteristics.populationData.labels;
    populationChart.data.datasets[0].data = unit.characteristics.populationData.values;
    populationChart.update();
    
    // 更新风险评估
    document.getElementById('risk-type').textContent = unit.risks.type;
    document.getElementById('risk-level').textContent = unit.risks.level;
    
    // 更新风险图表
    riskChart.data.labels = unit.risks.riskData.labels;
    riskChart.data.datasets[0].data = unit.risks.riskData.values;
    riskChart.update();
    
    // 更新供需匹配图表
    supplyDemandChart.data.labels = unit.risks.supplyDemandData.labels;
    supplyDemandChart.data.datasets[0].data = unit.risks.supplyDemandData.supply;
    supplyDemandChart.data.datasets[1].data = unit.risks.supplyDemandData.demand;
    supplyDemandChart.update();
    
    // 更新管控指标
    document.getElementById('green-ratio-target').textContent = unit.control.indicators.greenRatio.target;
    document.getElementById('green-ratio-current').textContent = unit.control.indicators.greenRatio.current;
    document.getElementById('green-ratio-gap').textContent = unit.control.indicators.greenRatio.gap;
    
    document.getElementById('park-coverage-target').textContent = unit.control.indicators.parkCoverage.target;
    document.getElementById('park-coverage-current').textContent = unit.control.indicators.parkCoverage.current;
    document.getElementById('park-coverage-gap').textContent = unit.control.indicators.parkCoverage.gap;
    
    document.getElementById('connectivity-target').textContent = unit.control.indicators.connectivity.target;
    document.getElementById('connectivity-current').textContent = unit.control.indicators.connectivity.current;
    document.getElementById('connectivity-gap').textContent = unit.control.indicators.connectivity.gap;
    
    // 更新结构修复要求
    document.getElementById('structure-requirements').textContent = unit.control.structureRequirements;
    
    // 更新优化策略
    document.getElementById('strategy-summary').textContent = unit.optimization.strategy;
    
    // 更新优化效果图表
    optimizationEffectChart.data.labels = unit.optimization.effectData.labels;
    optimizationEffectChart.data.datasets[0].data = unit.optimization.effectData.before;
    optimizationEffectChart.data.datasets[1].data = unit.optimization.effectData.after;
    optimizationEffectChart.update();
    
    // 更新策略图片
    const strategyImageContainer = document.getElementById('strategy-image');
    if (unit.optimization.imageUrl) {
        strategyImageContainer.innerHTML = `<img src="${unit.optimization.imageUrl}" alt="优化策略示意">`;
    } else {
        strategyImageContainer.innerHTML = `<div class="no-image-message">暂无策略示意图</div>`;
    }
}

// 切换标签页
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加active类到当前点击的按钮
            button.classList.add('active');
            
            // 激活对应的内容
            const tabId = button.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    loadUnits();
    setupTabs();
    
    // 搜索功能
    document.getElementById('search-btn').addEventListener('click', () => {
        const searchInput = document.getElementById('search-input').value.trim();
        if (!searchInput) return;
        
        // 简单的搜索逻辑，可根据需要扩展
        const foundUnit = mapData.units.find(unit => 
            unit.id.toLowerCase().includes(searchInput.toLowerCase()) || 
            unit.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        
        if (foundUnit) {
            selectUnit(foundUnit.id);
            // 定位到找到的单元
            const unitGeometry = L.geoJSON({type: "Feature", geometry: foundUnit.geometry});
            map.fitBounds(unitGeometry.getBounds());
        } else {
            alert('未找到匹配的单元');
        }
    });
    
    // 比例尺切换
    document.getElementById('scale-selector').addEventListener('change', (e) => {
        const scale = e.target.value;
        if (scale === 'city') {
            // 显示整个城市
            map.fitBounds(cityBoundaryLayer.getBounds());
        } else if (scale === 'unit') {
            // 显示所有单元
            map.fitBounds(unitsLayer.getBounds());
        }
    });
});
