import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookedSlot } from "@/lib/schema/user";
import { Clock8Icon } from "lucide-react";
import { UserRating } from "../user-rating";

export function BookedCard(props: BookedSlot) {
  const {
    id,
    status,
    rating,
    parking_address,
    start_time,
    end_time,
    duration_minutes,
    total_price,
    vehicle_type,
  } = props;
  console.log("props: ", props);

  return (
    <Card className="shadow-md dark:shadow-slate-900">
      <CardHeader className="relative px-2 pt-2 pb-0">
        <span className="ml-[2px] text-sm font-bold inline-block">
          {parking_address}
        </span>
      </CardHeader>
      <CardContent className="p-2 flex flex-col justify-between gap-2">
        <div className="flex gap-2">
          <Badge
            className="text-[9px] w-fit"
            variant={
              status?.toLowerCase() === "booked" ? "secondary" : "destructive"
            }
          >
            {status}
          </Badge>
          <Badge variant="secondary" className="text-[9px] w-fit">
            {vehicle_type}
          </Badge>
        </div>
        <span className="text-xs block self-start">
          Payment done with&nbsp;
          <span className="text-xs font-bold text-green-700 dark:text-green-500">
            &#8360;{total_price}
          </span>
        </span>

        <div className="flex flex-col">
          <span className="block text-xs font-bold">
            <Clock8Icon className="inline h-3 w-3" /> Payment done for date time
          </span>
          <span className="text-[9px]">
            {formatDateString(start_time, end_time)}{" "}
            <span className="font-semibold">({duration_minutes} min)</span>
          </span>
        </div>

        <UserRating
          id={id}
          initialRating={rating ?? 0}
          readOnly={status?.toLowerCase() === "booked"}
          booked
        />
      </CardContent>
      <Separator />
    </Card>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function formatDateString(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startDateFormatted = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
  const endDateFormatted = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });

  const startTimeFormatted = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const endTimeFormatted = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const formattedStartDate = `${startDateFormatted}, ${startTimeFormatted}`;
  const formattedEndDate = `${endDateFormatted}, ${endTimeFormatted}`;

  return `${formattedStartDate} - ${formattedEndDate}`;
}
