/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateProfilePhoto } from "@/services/auth/getUser.service";
import { Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  profile_photo?: string;
  name?: string;
}

export default function ProfilePhotoUpdateDialog({ profile_photo, name = "User" }: Props) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(profile_photo || null);
  const [state, action, isPending] = useActionState(updateProfilePhoto, null);

  // Toast feedback
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  // Revoke old preview URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview && preview !== profile_photo) URL.revokeObjectURL(preview);
    };
  }, [preview, profile_photo]);

  const handlePreview = (file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full p-0 absolute z-40 right-0"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Update Profile Photo</DialogTitle>
        </DialogHeader>

        <form action={action} encType="multipart/form-data">
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 pb-6 space-y-5">
            <FieldGroup className="gap-4">
              {/* Photo Preview */}
              <div className="flex justify-center">
                <Avatar className="h-32 w-32 rounded-full border overflow-hidden">
                  {preview ? (
                    <AvatarImage src={preview} alt={name} />
                  ) : (
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  )}
                </Avatar>
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
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
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
