// import { getToday } from "../utils/helpers";
// import supabase from "./supabase";

import axios from "axios";
import getURL, { PAGE_SIZE } from "../utils/globalConstants";
import { TBookingType, TFullBookingType } from "../schema/bookingSchema";

const URL = getURL();

interface GetAllBookingsResType {
  status: string;
  bookings: TBookingType[];
  length: number;
  totalBookings: number;
}

interface sortByType {
  field: "startDate" | "totalPrice";
  direction: "asc" | "desc";
}

export async function getAllBookings({
  filter,
  sortBy,
  page,
}: {
  filter: Record<string, string> | null;
  sortBy: Record<string, string | null>;
  page: number | null;
}) {
  try {
    // BUILDING THE URL

    // 1) FILTERING
    // For multiple filters create the filter as an Array of filter objects and loop over them and add them to the query string
    let url: string = `${URL}/bookings?`;
    if (filter !== null) {
      url += `
            ${filter?.field}
            ${
              filter.method && filter.method !== "equals"
                ? `[${filter.method}]`
                : ""
            }
            =
            ${filter?.value}`.replace(/\s/g, "");
    }

    // 2) SORTING
    if (sortBy) {
      if (filter) {
        url += `&`;
      }
      url += `sort[${sortBy.field}]
              =${sortBy.direction}
      `.replace(/\s/g, "");
    }

    // 3) PAGINATION
    if (page !== null) {
      if (filter || sortBy) {
        url += `&`;
      }
      url += `page=${page}&limit=${PAGE_SIZE}`;
    }

    // SENDING the REQUEST
    const res = await axios.get<GetAllBookingsResType>(url);
    // const res = await axios.get<GetAllBookingsResType>(`${URL}/bookings`);

    return {
      bookings: res.data.bookings,
      length: res.data.length,
      totalBookings: res.data.totalBookings,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Could not load the bookings");
  }
}

interface getBookingResType {
  status: string;
  booking: TFullBookingType;
}
export async function getBooking(id: number) {
  try {
    const res = await axios.get<getBookingResType>(`${URL}/bookings/${id}`);

    return res.data.booking;
  } catch (error) {
    console.log(error);
    throw new Error("Booking could not be fetched");
  }
}

// // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     // .select('*')
//     .select("*, guests(fullName)")
//     .gte("startDate", date)
//     .lte("startDate", getToday());

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

interface CheckinBookingObjectType {
  isPaid: boolean;
  status: string;
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
}

export async function checkinBooking(
  id: number,
  obj: CheckinBookingObjectType,
) {
  try {
    const res = await axios.patch<getBookingResType>(
      `${URL}/bookings/${id}`,
      obj,
    );

    return res.data.booking;
  } catch (error) {
    console.log(error);
    throw new Error("Booking could not be checked in");
  }
}

export async function checkoutBooking(id: number) {
  try {
    const res = await axios.patch<getBookingResType>(`${URL}/bookings/${id}`, {
      status: "checkedOut",
      isPaid: true,
    });

    return res.data.booking;
  } catch (error) {
    console.log(error);
    throw new Error("Booking could not be checked in");
  }
}

export async function deleteBooking(id: number) {
  try {
    const res = await axios.delete(`${URL}/bookings/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Booking could not be deleted");
  }
}
