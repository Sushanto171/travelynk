import z from "zod";
import { IPlanStatus, IPlanType } from "@/types/travelPlan.interface";

export const createPlanSchema = z.object({
  title: z.string("Title is required").nonempty("Title is required"),
  destination: z.string("Description is required").nonempty("Description is required"),
  latitude: z.number("Latitude is required"),
  longitude: z.number("Longitude is required"),
  place_id: z.string().optional(),
  map_url: z.string().optional(),
  budget: z.number("Plan budget is required").nonnegative("Plan budget must be positive value"),
  start_date: z.coerce.date("Start Date is required"),
  end_date: z.coerce.date("End Date is required"),
  tour_type: z.enum(Object.values(IPlanType)),
  itinerary: z.string().optional(),
  tag: z.string().optional(),
}).refine(
  (data) => data.end_date >= data.start_date,
  {
    message: "End date cannot be earlier than start date",
    path: ["end_date"],
  }
);

export const updatePlanSchema = z.object({
  title: z.string("Title is required").nonempty("Title is required").optional(),
  destination: z.string("Description is required").nonempty("Description is required").optional(),
  latitude: z.number("Latitude is required").optional(),
  longitude: z.number("Longitude is required").optional(),
  place_id: z.string().optional(),
  map_url: z.string().optional(),
  budget: z.number("Plan budget is required").nonnegative("Plan budget must be positive value").optional(),
  start_date: z.coerce.date("Start Date is required").optional(),
  end_date: z.coerce.date("End Date is required").optional(),
  tour_type: z.enum(Object.values(IPlanType)).optional(),
  itinerary: z.string().optional(),
  tag: z.string().optional(),
}).refine(
  (data) => {
    if (data.end_date && data.start_date) {
      return data.end_date >= data.start_date;
    }
    return true
  },
  {
    message: "End date cannot be earlier than start date",
    path: ["end_date"],
  }
);



