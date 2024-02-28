import { Input } from "./ui/input";

export default function Header() {
    return <div className="p-4 px-6 w-full">
        <Input className="mb-6 text-muted-foreground w-[32rem]" placeholder="Search" />
    </div>
}