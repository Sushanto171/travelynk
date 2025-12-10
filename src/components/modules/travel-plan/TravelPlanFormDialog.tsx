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
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTravelPlan } from "@/services/traveler/travelPlan.service";
import { IPlanType, ITravelPlan } from "@/types/travelPlan.interface";
import { Edit, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

interface PlanDialogProps {
  plan?: ITravelPlan; // If provided → update, else → create
}

export default function TravelPlanCreateUpdateDialog({ plan }: PlanDialogProps) {
  const [open, setOpen] = useState(false);

  const [dateRange, ] = useState<DateRange | undefined>({
    from: plan ? new Date(plan.start_date) : undefined,
    to: plan ? new Date(plan.end_date) : undefined,
  });

  const [state, action, isPending] = useActionState(
    plan ? () => { } : createTravelPlan,
    null
  );

  useEffect(() => {
    if (!state) return;
console.log(state)
    if (state.success) {
      toast.success(state.message);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* Trigger */}
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

      {/* Modal */}
      <DialogContent
        className="
          w-full 
          max-w-4xl! 
          p-0 
          md:rounded-xl 
          rounded-none 
          h-[100dvh] 
          md:h-auto
        "
      >
        <DialogHeader className="p-6 pb-3 border-b">
          <DialogTitle className="text-xl font-semibold">
            {plan ? "Update Travel Plan" : "Create New Plan"}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
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

              {/* Hidden ID for update */}
              {plan && (
                <input
                  type="string"
                  name="id"
                  hidden
                  defaultValue={plan.id}
                />
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Title */}
                <Field>
                  <FieldLabel htmlFor="title">
                    Title <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Bali Summer Trip"
                    defaultValue={plan?.title || ""}
                  />
                </Field>

                {/* Destination */}
                <Field>
                  <FieldLabel htmlFor="destination">
                    Destination <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="e.g., Bali, Indonesia"
                    defaultValue={plan?.destination || ""}
                  />
                </Field>

                {/* Latitude */}
                <Field>
                  <FieldLabel htmlFor="latitude">
                    Latitude <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g., -8.409518"
                    defaultValue={plan?.latitude || ""}
                  />
                </Field>

                {/* Longitude */}
                <Field>
                  <FieldLabel htmlFor="longitude">
                    Longitude <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g., 115.188919"
                    defaultValue={plan?.longitude || ""}
                  />
                </Field>

                {/* Google Place ID */}
                <Field>
                  <FieldLabel htmlFor="place_id">
                    Google Place ID <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="place_id"
                    name="place_id"
                    placeholder="Place ID from Google Maps"
                    defaultValue={plan?.place_id || ""}
                  />
                </Field>

                {/* Map URL */}
                <Field>
                  <FieldLabel htmlFor="map_url">
                    Map URL <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="map_url"
                    name="map_url"
                    placeholder="Direct Google Maps link"
                    defaultValue={plan?.map_url || ""}
                  />
                </Field>

                {/* Budget */}
                <Field>
                  <FieldLabel htmlFor="budget">
                    Budget <span className="text-xs text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Estimated trip cost"
                    defaultValue={plan?.budget || ""}
                  />
                </Field>
              </div>

              {/* Date Range Picker */}
              <DateRangePickerField
                label="Trip Duration (optional)"
                nameFrom="start_date"
                nameTo="end_date"
                placeholder="Select trip start and end dates"
                defaultValue={dateRange}
              />

              {/* Tour Type */}
              <SelectField
                label="Tour Type (optional)"
                name="tour_type"
                defaultValue={plan?.tour_type as unknown as string || undefined}
                options={Object.values(IPlanType).map((type) => ({
                  value: type,
                  label: type,
                })) as unknown as SelectOption[]}
              />

              {/* Itinerary */}
              <Field>
                <FieldLabel htmlFor="itinerary">
                  Itinerary <span className="text-xs text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Textarea
                  id="itinerary"
                  name="itinerary"
                  className="min-h-[120px]"
                  placeholder="Describe your day-by-day travel plan…"
                  defaultValue={plan?.itinerary || ""}
                />
              </Field>

              {/* Tag */}
              <Field>
                <FieldLabel htmlFor="tag">
                  Tag <span className="text-xs text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Input
                  id="tag"
                  name="tag"
                  placeholder="e.g., Solo, Family, Adventure"
                  defaultValue={plan?.tag || ""}
                />
              </Field>

            </FieldGroup>
          </div>

          {/* Footer */}
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
