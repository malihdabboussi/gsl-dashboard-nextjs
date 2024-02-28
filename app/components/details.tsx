import { details } from '../details';
import { Entity } from '../types';
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"

export function Details({ entity }: { entity: Entity; }) {
    // START
    const creditLimit = 100;
    const deleteEntity = () => {
        return;
    }
    // END

    return <div className='flex flex-col w-full gap-4 px-8'>
        <div className="flex items-center justify-between gap-4 pb-4 border-b-2">
            <span className="text-lg font-medium">Details</span>
            <div className="flex gap-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently remove the customer's billing information and immediately cancel any current subscriptions. Past payments or invoices associated with the customer will still remain. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={
                                () => {
                                    deleteEntity()
                                    window.open("/customers", "_self")
                                }
                            }>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-6">
            <div className="flex flex-col col-span-2 gap-2">
                <span className="text-sm font-normal text-muted-foreground">Account details</span>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-normal">{entity?.name}</span>
                    <span className="text-sm font-normal">{entity?.email}</span>
                </div>
            </div>
            <div className="flex flex-col col-span-3 gap-2">
                <span className="text-sm font-normal text-muted-foreground">Billing details</span>
                {entity.billingInfo && entity.billingInfo.address.lines &&
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-normal">{entity.billingInfo.address.country}{", "}
                            {entity.billingInfo.address.lines.join(",")}{", "}
                            {entity.billingInfo.address.town}{", "}
                            {entity.billingInfo.address.postalCode}
                        </span>
                        <span className="text-sm font-normal">+{entity.billingInfo.phone.country.code}{" "}
                            {entity.billingInfo.phone.phoneNumber}
                        </span>
                    </div>}
            </div>
            <div className="flex flex-col col-span-2 gap-2">
                <span className="text-sm font-normal text-muted-foreground">Credit Limit</span>
                {creditLimit &&
                    <span className="text-sm font-normal">{details.currency.prefix}{creditLimit} {details.currency.suffix}</span>}
            </div>
            <div className="flex flex-col col-span-3 gap-2">
                <span className="text-sm font-normal text-muted-foreground">Credit duration</span>
                {creditLimit &&
                    <span className="text-sm font-normal">
                        {entity.creditLimitDuration[0].toDateString() + " - " +
                            entity.creditLimitDuration[1].toDateString()}
                    </span>}
            </div>
        </div>
    </div>;
}
