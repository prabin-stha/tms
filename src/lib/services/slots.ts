import { CreateSlot } from "@/components/template/sidesheet/add-slot-sidesheet";
import {
  Rate,
  bookedSlotUsersSchema,
  bookedSlotsSchema,
  bookingSchema,
  bookingSlotsSchema,
  slotSchema,
  slotsSchema,
} from "../schema/user";
import { client } from "./axios";
import { BookingSlot } from "@/components/template/sidesheet/booking-sidesheet";

// ?address__icontains=street&status=Available&price=10&type=Bike' \
export async function getAllParkSlots(address?: string, type?: string) {
  let url = "/api/v1/parkslots?";
  if (address) url += `address__icontains=${address}`;
  if (type) url += `type=${type}`;
  const response = await client.get(url);
  const parsed = slotsSchema.parse(response.data.results);

  return parsed;
}

export async function getUserParkSlots() {
  const response = await client.get("/api/v1/parkslot/");
  const parsed = slotsSchema.parse(response.data.results);

  return parsed;
}

export async function createUserParkSlot(data: CreateSlot) {
  const formData = new FormData();
  formData.append("address", data.address);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("type", data.type);
  formData.append(
    "picture",
    data.picture?.[0] as Blob,
    data.picture?.[0]?.name
  );

  const response = await client.post("/api/v1/parkslot/", formData);
  const parsed = slotSchema.parse(response.data);

  return parsed;
}

export async function updateUserParkSlot(id: number, data: CreateSlot) {
  const formData = new FormData();
  formData.append("address", data.address);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("type", data.type);
  if (data.picture && typeof data.picture === "object") {
    formData.append(
      "picture",
      data.picture?.[0] as Blob,
      data.picture?.[0]?.name
    );
  }

  const response = await client.patch(`/api/v1/parkslot/${id}/`, formData);
  const parsed = slotSchema.parse(response.data);

  return parsed;
}

export async function deleteUserParkSlot(id: number) {
  await client.delete(`/api/v1/parkslot/${id}`);
}

export async function bookSlot(data: BookingSlot) {
  const response = await client.post("/api/v1/book/", {
    ...data,
    start_time: addSeconds(data.start_time),
    end_time: addSeconds(data.end_time),
  });
  const parsed = bookingSchema.parse(response.data.data);

  return parsed;
}

export async function fetchBookedSlots() {
  const response = await client.get("/api/v1/bookings/");
  const parsed = bookedSlotsSchema.parse(response.data.data);

  return parsed;
}

export async function fetchAllBookedSlots() {
  const response = await client.get("/api/v1/parkslot/bookings/");
  const parsed = bookingSlotsSchema.parse(response.data.data);

  return parsed;
}

export async function rateSlot(data: Rate) {
  await client.post("/api/v1/rate/", data);
}

export async function fetchSingleBooking(id: number) {
  const response = await client.get(`api/v1/parkslot/bookings/${id}/`);
  const parsed = bookedSlotUsersSchema.parse(response.data.data);
  return parsed;
}

function addSeconds(datetimeValue: string) {
  let updatedValue = datetimeValue;
  if (datetimeValue.length === 16) {
    updatedValue += ":00";
  }
  return updatedValue;
}
