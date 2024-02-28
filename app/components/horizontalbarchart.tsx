import { Bar } from 'react-chartjs-2';

export default function HorizontalBarChart({ label, labels, data, options, ...props }: {
    label: string,
    labels: string[],
    data: number[],
    options?: any
}) {

    const chartData = {
        labels: labels,
        datasets: [{
            label: label,
            data: data,
            backgroundColor: "#337DE9",
            borderColor: "transparent",
        }],
    };
    return <Bar data={chartData} options={options} {...props} />
}