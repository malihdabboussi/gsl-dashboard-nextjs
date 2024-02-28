import moment from "moment";

export function BaseDataCard({
    className,
    graph,
    title,
    subtitle,
    titleHelper,
    children,
    updatedTime,
    ...props
}: {
    className?: string,
    graph: React.ReactNode,
    title: string,
    subtitle: string,
    titleHelper?: React.ReactNode,
    children?: React.ReactNode,
    updatedTime?: Date,
}) {
    return <div className={"flex flex-col gap-2 " + className} {...props}>
        <div className="flex flex-col gap-2">
            <span className="flex max-h-[32px] items-center gap-2">
                <h1 className="title mr-2">{title}</h1>
                {
                    titleHelper && titleHelper
                }
            </span>
            <h1 className="text-xl font-normal text-muted-foreground">{subtitle}</h1>
        </div>
        {graph}
        <div className="w-full flex justify-end">
            {updatedTime &&
                <span className="text-sm text-muted-foreground">Updated {moment(updatedTime).fromNow()}</span>
            }
        </div>
        {children}
    </div>
}