import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BookingCardProps } from "../booking-card";
import { ESidesheet, useSidesheet } from "@/store/sidesheet";
import { UserRating } from "../user-rating";
import { useEffect, useState } from "react";
import { fetchSingleBooking } from "@/lib/services/slots";
import { BookedSlotUser } from "@/lib/schema/user";
import { Clock8Icon } from "lucide-react";
import { formatDateString } from "../booked-card";

export function BookingDrawer(props: BookingCardProps) {
  const {
    id,
    status,
    price,
    address,
    description,
    type,
    picture,
    rating,
    showRating,
    hideBookNow,
    showBookingInfo,
  } = props;

  const { openSidesheet } = useSidesheet();

  const [bookings, setBookings] = useState<BookedSlotUser[] | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await fetchSingleBooking(id);
      setBookings(res);
    };
    console.log("dt: ", open, !bookings, showBookingInfo);
    if (open && !bookings && showBookingInfo) {
      fetchInfo();
    }
  }, [open, bookings, id, showBookingInfo]);

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <DrawerTrigger>
        <Button
          onClick={() => setOpen(true)}
          className="px-3 py-1 h-7 text-xs font-bold"
        >
          View More
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="pb-1">{address}</DrawerTitle>
          <Badge
            className="w-fit"
            variant={
              status.toLowerCase() === "available" ? "secondary" : "destructive"
            }
          >
            {status}
          </Badge>

          <div className="flex mt-3">
            <div className="w-1/4">
              <img
                src={picture}
                alt="parking"
                className="w-full h-60 object-cover rounded-sm"
              />
              <div className="flex justify-between gap-2 mt-2">
                <Badge variant="secondary" className="w-fit">
                  {type}
                </Badge>
                <span className="text-xs inline-block self-start">
                  <span className="text-sm font-bold text-green-700 dark:text-green-500">
                    &#8360;{price}
                  </span>{" "}
                  /hr
                </span>
              </div>
            </div>
            <div className="px-4">
              <DrawerDescription className="mb-2">
                {description}
              </DrawerDescription>
              {showBookingInfo && (
                <div className="mb-2">
                  <span className="font-bold">Booked Users</span>
                  <div className="grid grid-cols-4 gap-1">
                    {bookings?.map(
                      ({
                        start_time,
                        end_time,
                        duration_minutes,
                        total_price,
                        status,
                        user_email,
                      }) => (
                        <div className="p-2 flex flex-col justify-between gap-2 border rounded-sm border-slate-600 dark:border-slate-400">
                          <div className="flex gap-2">
                            <Badge
                              className="text-[9px] w-fit"
                              variant={
                                status?.toLowerCase() === "booked"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {status}
                            </Badge>
                          </div>

                          <span className="text-xs block self-start">
                            Payment done by&nbsp;
                            <span className="block text-xs font-bold text-black dark:text-white">
                              {user_email}
                            </span>
                          </span>

                          <span className="text-xs block self-start">
                            Payment done with&nbsp;
                            <span className="text-xs font-bold text-green-700 dark:text-green-500">
                              &#8360;{total_price}
                            </span>
                          </span>

                          <div className="flex flex-col">
                            <span className="block text-xs font-bold">
                              <Clock8Icon className="inline h-3 w-3" /> Payment
                              done for date time
                            </span>
                            <span className="text-[9px]">
                              {formatDateString(start_time, end_time)}{" "}
                              <span className="font-semibold">
                                ({duration_minutes} min)
                              </span>
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              <UserRating
                readOnly={!showRating}
                initialRating={rating}
                id={id}
              />
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row justify-end pt-0">
          <DrawerClose>
            {!hideBookNow && (
              <Button
                className="mr-2"
                onClick={() => {
                  setOpen(false);
                  openSidesheet(ESidesheet.BOOK_SLOT, {
                    data: {
                      park_slot_id: id,
                      rate: price,
                    },
                  });
                }}
              >
                Book Now
              </Button>
            )}
            <Button onClick={() => setOpen(false)} variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
