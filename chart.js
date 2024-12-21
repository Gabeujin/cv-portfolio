const chartConfigs = [
    {
        id: 'chart1',
        label: '전자지갑문서 처리(건)',
        asIs: 0,
        toBe: 24564,
        maxValue : 25000
    },
    {
        id: 'chart2',
        label: '행정망 연계 (억 레코드)',
        asIs: 0,
        toBe: 20,
        maxValue : 20
    },
    {
        id: 'chart3',
        label: 'Grid 조회 속도 (평균 sec)',
        asIs: 10,
        toBe: 5,
        maxValue : 10
    },
    {
        id: 'chart4',
        label: '대용량 데이터 조회 SQL 속도 (평균 sec)',
        asIs: 1800, // 30 minutes in seconds
        toBe: 10,
        maxValue : 1800
    },
    {
        id: 'chart5',
        label: 'FCP,LCP 성능지표 (sec)',
        asIs: 7,
        toBe: 1,
        maxValue : 10
    },
    {
        id: 'chart6',
        label: '등록률 개선 (%)',
        asIs: 52,
        toBe: 95,
        maxValue : 100
    },
];

// 공통 차트 생성 함수
function createChart({ id, label, asIs, toBe, maxValue }) {
    const ctx = document.getElementById(id).getContext('2d');
    const gradientAsIs = ctx.createLinearGradient(0, 0, 400, 0);
    gradientAsIs.addColorStop(0, 'rgba(255, 99, 132, 0.6)');
    gradientAsIs.addColorStop(1, 'rgba(255, 99, 132, 0.1)');

    const gradientToBe = ctx.createLinearGradient(0, 0, 400, 0);
    gradientToBe.addColorStop(0, 'rgba(54, 162, 235, 0.6)');
    gradientToBe.addColorStop(1, 'rgba(54, 162, 235, 0.1)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['AS-IS', 'TO-BE'],
            datasets: [
                {
                    label: label,
                    data: [asIs, toBe],
                    backgroundColor: [gradientAsIs, gradientToBe],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: label,
                    align: 'start',
                    font: {
                        size: 16,
                    },
                    padding: {
                        top: 10,
                        bottom: 20,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString();
                        },
                    },
                    max: maxValue
                },
                y: {
                    title: {
                        display: false,
                    },
                },
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuad',
            },
        },
    });
}


// 모든 차트 생성
chartConfigs.forEach((config) => createChart(config));
