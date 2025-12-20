/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateRangePickerField } from "@/components/shared/DateRangePickerField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { SelectField, SelectOption } from "@/components/shared/SelectField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GetFieldError from "@/lib/GetFieldError";
import { createTravelPlan, updateTravelPlan } from "@/services/travelPlan/travelPlan.service";
import { IPlanType, ITravelPlan } from "@/types/travelPlan.interface";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

interface PlanDialogProps {
  plan?: ITravelPlan;
}

export default function TravelPlanCreateUpdateDialog({ plan }: PlanDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    plan ? updateTravelPlan : createTravelPlan,
    null
  );

  const [dateRange] = useState<DateRange | undefined>({
    from:
      state?.FormData?.start_date
        ? new Date(state.FormData.start_date)
        : plan
          ? new Date(plan.start_date)
          : undefined,
    to:
      state?.FormData?.end_date
        ? new Date(state.FormData.end_date)
        : plan
          ? new Date(plan.end_date)
          : undefined,
  });

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.refresh();
    } else {
      if (state?.FormData) return;
      toast.error(state.message);
    }
  }, [state, router]);

  const getValue = (field: string, fallback?: any) =>
    state?.FormData?.[field] ?? fallback ?? "";


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {plan ? (
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Edit className="w-4 h-4 mr-1" />
            Edit Plan
          </Button>
        ) : (
          <Button size="sm" className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-1" />
            Create Plan
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="
          w-full 
          max-w-3xl! 
          p-0 
          md:rounded-xl 
          rounded-none 
          h-[9dvh] 
          md:h-auto
        "
      >
        <DialogHeader className="p-6 pb-3 border-b">
          <DialogTitle className="text-xl font-semibold">
            {plan ? "Update Travel Plan" : "Create New Plan"}
          </DialogTitle>
        </DialogHeader>

        <form action={action}>
          <div
            className="
              max-h-[calc(100dvh-160px)]
              md:max-h-[70vh]
              overflow-y-auto
              px-6 
              pb-6 
              pt-4 
              space-y-6
            "
          >
            <FieldGroup className="gap-6">
              {plan && (
                <input
                  type="string"
                  name="id"
                  hidden
                  defaultValue={plan.id}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Bali Summer Trip"
                    defaultValue={getValue("title", plan?.title)}
                  />
                  <GetFieldError state={state} name="title" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="destination">Destination</FieldLabel>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="e.g., Bali, Indonesia"
                    defaultValue={getValue("destination", plan?.destination)}
                  />
                  <GetFieldError state={state} name="destination" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="latitude">Latitude</FieldLabel>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g., -8.409518"
                    defaultValue={getValue("latitude", plan?.latitude)}
                  />
                  <GetFieldError state={state} name="latitude" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="longitude">Longitude</FieldLabel>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g., 115.188919"
                    defaultValue={getValue("longitude", plan?.longitude)}
                  />
                  <GetFieldError state={state} name="longitude" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="place_id">
                    Google Place ID <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="place_id"
                    name="place_id"
                    placeholder="Place ID from Google Maps"
                    defaultValue={getValue("place_id", plan?.place_id)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="map_url">
                    Map URL <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="map_url"
                    name="map_url"
                    placeholder="Direct Google Maps link"
                    defaultValue={getValue("map_url", plan?.map_url)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="budget">Budget</FieldLabel>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Estimated trip cost"
                    defaultValue={getValue("budget", plan?.budget)}
                  />
                  <GetFieldError state={state} name="budget" />
                </Field>
              </div>

              <DateRangePickerField
                label="Trip Duration "
                nameFrom="start_date"
                nameTo="end_date"
                placeholder="Select trip start and end dates"
                defaultValue={dateRange}
              />
              <div className="flex gap-4 item-start">
                <GetFieldError state={state} name="start_date" />
                <GetFieldError state={state} name="end_date" />
              </div>

              <SelectField
                label="Tour Type "
                name="tour_type"
                defaultValue={getValue("tour_type", plan?.tour_type)}
                options={Object.values(IPlanType).map((type) => ({
                  value: type,
                  label: type,
                })) as SelectOption[]}
              />
              <GetFieldError state={state} name="tour_type" />

              <Field>
                <FieldLabel htmlFor="itinerary">
                  Itinerary <span className="text-xs text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Textarea
                  id="itinerary"
                  name="itinerary"
                  className="min-h-[120px]"
                  placeholder="Describe your day-by-day travel plan…"
                  defaultValue={getValue("itinerary", plan?.itinerary)}
                />
                <GetFieldError state={state} name="itinerary" />
              </Field>

              <Field>
                <FieldLabel htmlFor="tag">
                  Tag 
                </FieldLabel>
                <Input
                  id="tag"
                  name="tag"
                  placeholder="e.g., Solo, Family, Adventure"
                  defaultValue={getValue("tag", plan?.tag)}
                />
                <GetFieldError state={state} name="tag" />
              </Field>
            </FieldGroup>
          </div>

          <div className="flex justify-end gap-3 border-t px-6 py-4 bg-background">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <LoadingButton isLoading={isPending} type="submit" loadingText="Saving...">
              {plan ? "Update" : "Create"}
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
