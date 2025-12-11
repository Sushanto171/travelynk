/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/review/review.service";
import { Star } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface CreateReviewDialogProps {
  planId: string;
}

export default function CreateReviewDialog({ planId }: CreateReviewDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  const [state, action, isPending] = useActionState(createReview, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      setRating(0);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Star className="w-4 h-4" /> Write Review
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form action={action}>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 pb-6 space-y-5">
            <FieldGroup className="gap-4">

              {/* Hidden plan_id */}
              <input type="hidden" name="plan_id" value={planId} />
              <input type="hidden" name="rating" value={rating} />

              {/* Rating Stars */}
              <Field>
                <FieldLabel>Rating</FieldLabel>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </Field>

              {/* Comment */}
              <Field>
                <FieldLabel htmlFor="comment">Comment</FieldLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  placeholder="Share your experience..."
                  className="min-h-[120px]"
                />
              </Field>

            </FieldGroup>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4 bg-background">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <LoadingButton isLoading={isPending} type="submit" loadingText="Submitting...">
              Submit Review
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
