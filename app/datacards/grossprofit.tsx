import LineChart from "../components/linechart"
import { details } from "../details"
import { BaseDataCard } from "./components/base"
import POVBadge from "./components/povBadge"

export function GrossProfitCard({ date, ...props }: {
    date: Date
}) {
    // START
    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.

    Do something with the `date` prop to fetch the data from the backend.
    */
    const relativeGrossProfitPercentage: number = 0.00
    const relativePointOfReference: string = "yesterday"
    const grossProfit: number = 380
    const labels: string[] = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    const data: number[] = [0, 0, 19, 0]
    const updatedTime = new Date()
    // END

    return <BaseDataCard title="Gross profit"
        titleHelper={<POVBadge percentage={relativeGrossProfitPercentage} pointOfReference={relativePointOfReference} />}
        subtitle={`${details.currency.prefix}${grossProfit} ${details.currency.suffix}`} {...props}
        graph={<LineChart label="Gross profit" labels={labels} data={data} />}
        updatedTime={updatedTime}
    />
}

export function GrossProfitMarginCard({ date, ...props }: {
    date: Date
}) {
    // START
    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.

    Do something with the `date` prop to fetch the data from the backend.
    */
    const relativeGrossProfitPercentage: number = 0.00
    const relativePointOfReference: string = "yesterday"
    const grossProfitByMargin: number = 380
    const labels: string[] = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    const data: number[] = [0, 0, 19, 0]
    const updatedTime = new Date()
    // END

    return <BaseDataCard title="Gross profit by margin"
        titleHelper={<POVBadge percentage={relativeGrossProfitPercentage} pointOfReference={relativePointOfReference} />}
        subtitle={`${details.currency.prefix}${grossProfitByMargin} ${details.currency.suffix}`} {...props}
        graph={<LineChart label="Gross profit by margin" labels={labels} data={data} />}
        updatedTime={updatedTime}
    />
}