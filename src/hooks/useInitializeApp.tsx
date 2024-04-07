import { useCallback, useEffect } from "react";

import { authService } from "@/lib/services/auth";
import {
  fetchBookedSlots,
  getAllParkSlots,
  getUserParkSlots,
} from "@/lib/services/slots";

import { useAuth } from "@/store/auth";
import { useSlots } from "@/store/slots";

export function useInitializeApp() {
  const { token, user, setUser } = useAuth(({ token, user, setUser }) => ({
    token,
    user,
    setUser,
  }));
  const {
    allSlots,
    mySlots,
    myBookings,
    setSlots,
    setMySlots,
    setMyBookings,
  } = useSlots(
    ({
      allSlots,
      mySlots,
      myBookings,
      setSlots,
      setMySlots,
      setMyBookings,
    }) => ({
      allSlots,
      mySlots,
      myBookings,
      setSlots,
      setMySlots,
      setMyBookings,
    })
  );

  const initUser = useCallback(async () => {
    const user = await authService.getUser();
    if (user) setUser(user);
  }, [setUser]);

  const initSlots = useCallback(async () => {
    try {
      const slots = await getAllParkSlots();
      setSlots(slots);
    } catch (err) {
      // handle err
    }
  }, [setSlots]);

  const initMySlots = useCallback(async () => {
    try {
      const slots = await getUserParkSlots();
      setMySlots(slots);
    } catch (err) {
      // handle err
    }
  }, [setMySlots]);

  const initMyBookings = useCallback(async () => {
    try {
      const bookings = await fetchBookedSlots();
      setMyBookings(bookings);
    } catch (err) {
      // handle err
    }
  }, [setMyBookings]);

  useEffect(() => {
    if (token && !user) initUser();
  }, [token, user, initUser]);

  useEffect(() => {
    if (token && !allSlots) initSlots();
  }, [token, allSlots, initSlots]);

  useEffect(() => {
    if (token && !mySlots) initMySlots();
  }, [token, mySlots, initMySlots]);

  useEffect(() => {
    if (token && !myBookings) initMyBookings();
  }, [token, myBookings, initMyBookings]);
}
