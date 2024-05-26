import { PAGE_SIZE } from "../utils/Constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings(filter, sortByObj, method = `eq`, page) {
  let query = supabase
    .from("bookings")
    .select(
      "id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,isPaid,hasBreakfast,observations, guests(*) , cabins(name)",
      { count: `exact` }
    );
  if (filter) query = query[method](filter.field, filter.value);

  if (sortByObj)
    query = query.order(sortByObj.field, {
      ascending: sortByObj.direction === `asc`,
    });
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return { data, count };
}
export async function addBooking(bookingData) {
  const { guestInfoObj, bookingInfoObj } = bookingData;
  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .insert([{ ...guestInfoObj }])
    .select()
    .single();
  if (guestError) {
    console.error(guestError);
    throw new Error(
      "couldn't add guest, booking not created, please try again"
    );
  }
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert([{ ...bookingInfoObj, guestId: guest.id }])
    .select()
    .single();
  if (bookingError) {
    const { deleteGuestError } = await supabase
      .from("guests")
      .delete()
      .eq("id", guest.id);
    if (deleteGuestError)
      throw new Error(
        "couldn't create booking and couldn't delete guest, please reach out to a manager"
      );
    throw new Error("couldn't create booking, guest deleted, please try again");
  }
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
