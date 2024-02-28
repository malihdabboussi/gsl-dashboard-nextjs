import { ArrowUpIcon, DashIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Badge } from "../../components/ui/badge";

export default function POVBadge({ percentage, pointOfReference }: { percentage: number, pointOfReference: string }) {
    return <span className="text-sm flex items-center gap-2">
        <Badge variant={percentage > 0 ? "secondary" : percentage === 0 ? "outline" : "destructive"}>{percentage > 0 ? <ArrowUpIcon /> : percentage === 0 ? <DashIcon /> : <ArrowDownIcon />} {Math.abs(percentage)}%</Badge> since {pointOfReference}
    </span>
}