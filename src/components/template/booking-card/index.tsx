import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingDrawer } from "../booking-drawer";
import { Pencil, Trash2Icon } from "lucide-react";
import { deleteUserParkSlot } from "@/lib/services/slots";
import { useSlots } from "@/store/slots";
import { ESidesheet, useSidesheet } from "@/store/sidesheet";
import { Button } from "@/components/ui/button";
import { Rating } from "../rating";
import { useToast } from "@/components/ui/use-toast";

export interface BookingCardProps {
  id: number;
  status: string;
  price: number;
  address: string;
  description: string;
  type: string;
  picture: string;
  rating: number;
  showActions?: boolean;
  showRating?: boolean;
  hideBookNow?: boolean;
}

export function BookingCard(props: BookingCardProps) {
  const {
    id,
    status,
    price,
    address,
    description,
    type,
    picture,
    rating,
    showActions,
    hideBookNow,
  } = props;

  const deleteSlot = useSlots((state) => state.deleteSlot);
  const openSidesheet = useSidesheet((state) => state.openSidesheet);
  const { toast } = useToast();

  const handleDeleteSlot = async () => {
    try {
      await deleteUserParkSlot(id);
      deleteSlot(id);
      toast({
        title: "Remove Success",
        description: "Sucessfully removed parking slot.",
      });
    } catch (err) {
      toast({
        title: "Remove Error",
        description: "Couldn't remove parking slot!",
      });
    }
  };

  return (
    <Card className="shadow-md dark:shadow-slate-900">
      <CardHeader className="relative px-2 pt-2 pb-0">
        <img
          className="rounded-sm h-56 object-cover"
          src={picture}
          alt="parking"
        />
        <Badge
          className="absolute right-2 mr-2 mt-4 text-[9px] w-fit"
          variant={
            status.toLowerCase() === "available" ? "secondary" : "destructive"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="p-2 flex flex-col justify-between gap-2">
        <div className="flex justify-between gap-2">
          <Badge variant="secondary" className="text-[9px] w-fit">
            {type}
          </Badge>
          <span className="text-xs inline-block self-start">
            <span className="text-sm font-bold text-green-700 dark:text-green-500">
              &#8360;{price}
            </span>{" "}
            /hr
          </span>
        </div>
        <span className="ml-[2px] text-sm font-bold inline-block">
          {address}
        </span>
        <Rating stars={rating} />
        <div className="line-clamp-2 ml-[2px] text-xs h-[32px]">
          {description}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-2 flex justify-between items-center">
        <BookingDrawer {...props} />
        {showActions ? (
          <div className="flex gap-3 justify-end">
            <Button
              className="p-1 h-8 w-8"
              variant="destructive"
              onClick={handleDeleteSlot}
            >
              <Trash2Icon className="h-4 w-4 font-black" />
            </Button>
            <Button
              className="p-1 h-8 w-8"
              variant="outline"
              onClick={async () => {
                openSidesheet(ESidesheet.ADD_SLOT, {
                  isEditing: true,
                  data: props,
                });
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ) : hideBookNow ? null : (
          <Button
            className="px-3 py-1 h-7 text-xs font-bold"
            variant="secondary"
            onClick={async () => {
              openSidesheet(ESidesheet.BOOK_SLOT, {
                data: { park_slot_id: id, rate: price },
              });
            }}
          >
            Book Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
