import { Line } from 'react-chartjs-2';

export default function LineChart({ label, labels, data, ...props }: { label: string, labels: string[], data: number[] }) {

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
        transitions: {
            show: {
                animations: {
                    x: {
                        from: 0
                    },
                    y: {
                        from: 0
                    }
                }
            },
            hide: {
                animations: {
                    x: {
                        to: 0
                    },
                    y: {
                        to: 0
                    }
                }
            }
        }
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                fill: false,
                borderColor: '#337DE9',
                tension: 0,
            }
        ]
    }

    return <Line data={chartData} options={options} {...props} />
}