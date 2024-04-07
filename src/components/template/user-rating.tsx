import { useState } from "react";
import { ItemStyles, Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { rateSlot } from "@/lib/services/slots";

const myStyles: ItemStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

interface UserRatingProps {
  id: number;
  initialRating: number;
  readOnly?: boolean;
}
export function UserRating({
  id,
  initialRating = 0,
  readOnly,
}: UserRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveringRating, setHoveringRating] = useState(0);

  const handleRateChange = async (rate: number) => {
    setRating(rate);
    await rateSlot({ booking_id: id, rating: rate });
  };

  return (
    <div>
      <span className="text-sm font-semibold">Rate your experience.</span>
      <Rating
        isDisabled={initialRating > 0 || readOnly}
        halfFillMode="svg"
        style={{ maxWidth: 150 }}
        value={rating}
        onChange={handleRateChange}
        onHoverChange={setHoveringRating}
        itemStyles={myStyles}
      />
      {readOnly ? (
        <span className="block mt-1 ml-1 text-xs">
          Complete your parking to rate.
        </span>
      ) : (
        <span className="block mt-1 ml-1 text-xs">
          {hoveringRating || rating} out of 5
        </span>
      )}
    </div>
  );
}
