import { ChartOptions } from "chart.js";
import HorizontalBarChart from "../components/horizontalbarchart";
import { BaseDataCard } from "./components/base";
import { details } from "../details";

export default function TopProductsCard({ date, ...props }: {
    date: Date
}) {

    // START

    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.

    Do something with the `date` prop to fetch the data from the backend.
    */

    const productsSorted: {
        price: number,
        name: string,
        quantity: number
    }[] = [
        {
            name: "Spoon",
            price: 100,
            quantity: 6340
        },
        {
            name: "Fork",
            price: 3000,
            quantity: 1234
        },
        {
            name: "Knife",
            price: 22,
            quantity: 4523
        },
        {
            name: "Plate",
            price: 55,
            quantity: 2134
        },
        {
            name: "Cup",
            price: 33,
            quantity: 5345
        },
        {
            name: "Bowl",
            price: 76,
            quantity: 1234
        },
        {
            name: "Saucer",
            price: 34,
            quantity: 400
        },
        {
            name: "Napkin",
            price: 23,
            quantity: 100
        }
    ].sort(
        (a, b) => b.quantity - a.quantity
    )
    const topProduct = productsSorted[0].name
    const updatedTime = new Date()

    // END


    const options = {
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
            z: {
                type: 'category',
                labels: productsSorted.map(p => `${details.currency.prefix}${p.price}`),
                display: true,
                position: 'right',
                grid: {
                    display: false,
                },
            }
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
        },
        indexAxis: 'y' as const,
        borderWidth: 0,
        barThickness: 2,
        plugins: {
            legend: {
                display: false
            },
        }
    }

    return <BaseDataCard title="Top products" subtitle={topProduct} graph={
        <HorizontalBarChart label="Quantity" labels={productsSorted.map(p => p.name)} data={productsSorted.map(p => p.quantity)} options={options} />
    }
        updatedTime={updatedTime}
    />
}