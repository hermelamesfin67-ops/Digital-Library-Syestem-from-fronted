import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";

const successStatuses = [
    "APPROVED",
    "ENABLED",
    "ACTIVE",
    "RETURNED",
];

const dangerStatuses = [
    "REJECTED",
    "INACTIVE",
    "EXPIRED",
    "DISABLED",
    "CANCELED",
    "BLOCKED",
    "OVERDUE"
];

const warningStatuses = ["PENDING", "IN_REVIEW", "SUSPENDED", "BORROWED"];


function Status(status: string) {
    const normalizedStatus = status?.toUpperCase();

    const getBadgeColor = () => {
        if (successStatuses.includes(normalizedStatus)) return "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
        if (dangerStatuses.includes(normalizedStatus)) return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
        if (warningStatuses.includes(normalizedStatus)) return "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
        return "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300";
    };

    const getLabel = () => {
        switch (normalizedStatus) {
            case "INACTIVE":
                return "IN ACTIVE";

            case "NOTEXPIRED":
                return "NOT EXPIRED";

            default:
                return status;
        }
    };
    return (
        // <Badge variant="default | outline | secondary | destructive">Badge</Badge>
        <Badge
            variant="outline"
            className={cn("h-fit w-fit whitespace-nowrap capitalize", getBadgeColor())}
        >
            {getLabel()?.replaceAll("_", " ")}
        </Badge>
    )
}

export default Status