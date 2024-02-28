import LineChart from "../components/linechart";
import { BaseDataCard } from "./components/base";
import POVBadge from "./components/povBadge";
import { details } from "../details";

export default function SalesCard({ date, ...props }: {
    date: Date
}) {

    // START

    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.

    Do something with the `date` prop to fetch the data from the backend.
    */

    const relativeSalesPercentage: number = 0.00
    const relativePointOfReference: string = "yesterday"
    const sales: number = 380
    const labels: string[] = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    const data: number[] = [0, 0, 19, 0]
    const updatedTime = new Date()
    // END


    return <BaseDataCard title="Sales"
        titleHelper={<POVBadge percentage={relativeSalesPercentage} pointOfReference={relativePointOfReference} />}
        subtitle={`${details.currency.prefix}${sales} ${details.currency.suffix}`} {...props}
        graph={<LineChart label="Sales" labels={labels} data={data} />}
        updatedTime={updatedTime}
    />
}