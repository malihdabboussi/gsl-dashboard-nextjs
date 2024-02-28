import LineChart from "../components/linechart"
import { BaseDataCard } from "./components/base"

export default function NumberOfOrders({ date, ...props }: {
    date: Date
}) {
    // START
    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.

    Do something with the `date` prop to fetch the data from the backend.
    */
    const numberOfOrders: number = 7564
    const labels: string[] = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    const data: number[] = [0, 0, 19, 0]
    const updatedTime = new Date()
    // END

    return <BaseDataCard title="Number of orders"
        subtitle={`${numberOfOrders}`} {...props}
        graph={<LineChart label="Number of orders" labels={labels} data={data} />}
        updatedTime={updatedTime}
    />
}