import LineChart from "../components/linechart"
import { details } from "../details"
import { BaseDataCard } from "./components/base"
import POVBadge from "./components/povBadge"

export default function AvgTransactionValCard({ date, ...props }: {
    date: Date
}) {
    // START
    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.

    Do something with the `date` prop to fetch the data from the backend.
    */
    const relativeAvgTransactionValPercentage: number = 0.00
    const relativePointOfReference: string = "yesterday"
    const avgTransactionVal: number = 380
    const labels: string[] = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    const data: number[] = [0, 0, 19, 0]
    const updatedTime = new Date()
    // END

    return <BaseDataCard title="Average transaction value"
        titleHelper={<POVBadge percentage={relativeAvgTransactionValPercentage} pointOfReference={relativePointOfReference} />}
        subtitle={`${details.currency.prefix}${avgTransactionVal} ${details.currency.suffix}`} {...props}
        graph={<LineChart label="Average transaction value" labels={labels} data={data} />}
        updatedTime={updatedTime}
    />
}