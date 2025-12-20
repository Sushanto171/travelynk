/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BioField } from "@/components/shared/BioField";
import { DatePickerField } from "@/components/shared/DatePickerField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { MultiSelectField } from "@/components/shared/MultiSeceletFilter";
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
import { updateTraveler } from "@/services/traveler/traveler.service";
import { ICountry } from "@/types/country.interface";
import { IInterest } from "@/types/interest.interface";
import { ITraveler } from "@/types/user.interface";
import { Edit } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface UpdateTravelerDialogProps {
  traveler?: ITraveler;
  interests: IInterest[];
  countries: ICountry[];
  showButton?: boolean;
  handleRefresh?: () => void
}

export default function UpdateTravelerDialog({
  traveler,
  interests,
  countries,
  showButton = true,
  handleRefresh
}: UpdateTravelerDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(updateTraveler, null);

  // Handle submit result ONLY
  useEffect(() => {
    if (!state) return;
    if (handleRefresh) {
      handleRefresh()
    }
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (!showButton && traveler) {
      setOpen(true);
    }

  }, [traveler, showButton,]);

  console.log(traveler)
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild hidden={!showButton}>
        <Button variant="outline" size="sm" className="w-full md:w-auto">
          <Edit className="w-4 h-4 mr-1" />
          Edit Profile
        </Button>
      </DialogTrigger>

      {/* key prevents stale form values */}
      <DialogContent key={traveler?.id} className="max-w-md p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Update Profile Info</DialogTitle>
        </DialogHeader>

        <form action={action}>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 pb-6 space-y-5">
            <FieldGroup className="gap-4">
              {/* id */}
              <input type="hidden" name="id" defaultValue={traveler?.id} />

              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  defaultValue={traveler?.name || ""}
                />
              </Field>

              {/* Bio */}
              <BioField
                name="bio"
                defaultValue={traveler?.bio}
                maxLength={255}
              />

              {/* Contact Number */}
              <Field>
                <FieldLabel htmlFor="contact_number">
                  Contact Number
                </FieldLabel>
                <Input
                  id="contact_number"
                  name="contact_number"
                  defaultValue={traveler?.contact_number || ""}
                />
              </Field>

              {/* Date of Birth */}
              <DatePickerField
                label="Date of Birth"
                name="date_of_birth"
                defaultValue={
                  traveler?.date_of_birth
                    ? new Date(traveler?.date_of_birth)
                    : null
                }
              />

              {/* Address */}
              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  defaultValue={traveler?.address || ""}
                />
              </Field>

              {/* Current Location */}
              <Field>
                <FieldLabel htmlFor="current_location">
                  Current Location
                </FieldLabel>
                <Input
                  id="current_location"
                  name="current_location"
                  defaultValue={traveler?.current_location || ""}
                />
              </Field>

              {/* Interests */}
              <MultiSelectField
                label="Interests"
                name="interests[]"
                removeName="remove_interests[]"
                options={interests.map((i) => ({
                  value: i.id as string,
                  label: i.name,
                }))}
                defaultValues={
                  traveler?.interests?.map((i) => i?.id as string ) || []
                }
              />

              {/* Visited Countries */}
              <MultiSelectField
                label="Visited Countries"
                name="visited_countries[]"
                removeName="remove_visited_countries[]"
                options={countries.map((c) => ({
                  value: c.id as string,
                  label: c.name,
                }))}
                defaultValues={
                  traveler?.visited_countries?.map(
                    (c) => c.id as string
                  ) || []
                }
              />
            </FieldGroup>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4 bg-background">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <LoadingButton
              isLoading={isPending}
              type="submit"
              loadingText="Saving..."
            >
              Update
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
