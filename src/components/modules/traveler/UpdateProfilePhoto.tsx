/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateProfilePhoto } from "@/services/auth/getUser.service";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProfilePhotoUpdateDialog({ profile_photo }: { profile_photo?: string | undefined }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(profile_photo || null);
  const [state, action, isPending] = useActionState(updateProfilePhoto, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const handlePreview = (file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full p-0 md:w-auto absolute z-40 right-0 m-0">
          <Camera className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Update Profile Photo</DialogTitle>
        </DialogHeader>

        <form action={action} >
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 pb-6 space-y-5">

            <FieldGroup className="gap-4">


              {/* Photo Preview */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                  <Image
                    src={preview || "/default-avatar.png"}
                    alt="Profile Photo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* File Upload */}
              <Field>
                <FieldLabel htmlFor="profile_photo">Upload New Photo</FieldLabel>
                <input
                  type="file"
                  accept="image/*"
                  id="profile_photo"
                  name="file"
                  className="block w-full border rounded-md p-2"
                  onChange={(e) => handlePreview(e.target.files?.[0] ?? null)}
                />
              </Field>

            </FieldGroup>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4 bg-background">
            <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>

            <LoadingButton isLoading={isPending} type="submit" loadingText="Saving...">
              Update
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
