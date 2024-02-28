import LineChart from './linechart';
import { details } from '../details';
import { GraphProps } from '../types';

export function Insights({ insightsGraph, total, isSupplier }: { insightsGraph: GraphProps; total: number; isSupplier: boolean; }) {

    // START
    const transactions = ["", ""];
    // END
    return <div className='flex flex-col w-full gap-4 px-8'>
        <div className="pb-4 border-b-2">
            <span className="text-lg font-medium">Insights</span>
        </div>
        <div className="grid grid-cols-6 gap-6">
            <div className='flex flex-col col-span-2 gap-4'>
                <span className="text-sm font-normal text-muted-foreground">Total {isSupplier ? 'supplied' : 'spent'}</span>
                <h1 className="text-xl font-bold">{details.currency.prefix}{total} {details.currency.suffix}</h1>
                <span className="text-sm font-normal text-muted-foreground">{transactions.length} transactions</span>

            </div>
            <div className="col-span-4">
                <LineChart label="Insights" labels={insightsGraph.labels} data={insightsGraph.data} />
            </div>
        </div>
    </div>;
}
