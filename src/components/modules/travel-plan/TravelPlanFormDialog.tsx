/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useMemo,useActionState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { DateRangePickerField } from "@/components/shared/DateRangePickerField"
import { LoadingButton } from "@/components/shared/LoadingButton"
import { SelectField, SelectOption } from "@/components/shared/SelectField"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import GetFieldError from "@/lib/GetFieldError"
import { createTravelPlan, updateTravelPlan } from "@/services/travelPlan/travelPlan.service"
import { IPlanType, ITravelPlan } from "@/types/travelPlan.interface"
import { Edit, Plus } from "lucide-react"
import { DateRange } from "react-day-picker"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix Leaflet default marker
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

interface PlanDialogProps {
  plan?: ITravelPlan
  onClose?: () => void
  onSuccess?: () => void
  showButton?: boolean
}

export default function TravelPlanCreateUpdateDialog({
  plan,
  onClose,
  onSuccess,
  showButton = true,
}: PlanDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [state, action, isPending] = useActionState(
    plan ? updateTravelPlan : createTravelPlan,
    null
  )

  const [selectedLocation, setSelectedLocation] = useState<{
    lat?: number
    lng?: number
    name?: string
  }>({
    lat: plan?.latitude,
    lng: plan?.longitude,
    name: plan?.destination,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Open automatically for edit without button
  useEffect(() => {
    if (!showButton && plan) setOpen(true)
  }, [plan, showButton])

  const dateRange: DateRange | undefined = useMemo(() => {
    if (state?.FormData?.start_date && state?.FormData?.end_date) {
      return {
        from: new Date(state.FormData.start_date),
        to: new Date(state.FormData.end_date),
      }
    }
    if (plan) return { from: new Date(plan.start_date), to: new Date(plan.end_date) }
    return undefined
  }, [state, plan])

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
      setOpen(false)
      router.refresh()
      onSuccess?.()
    } else {
      if (state?.FormData) return
      toast.error(state.message)
    }
  }, [state, router])

  useEffect(() => {
    if (!open) onClose?.()
  }, [open])

  const getValue = (field: keyof ITravelPlan | string, fallback?: any) =>
    state?.FormData?.[field] ?? fallback ?? (plan && (field in plan) ? (plan as ITravelPlan)[field as keyof ITravelPlan] : "") ?? ""

  // Fetch search results
  useEffect(() => {
    if (!searchQuery) return setSearchResults([])
    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&addressdetails=1&limit=5`
      )
      const data = await res.json()
      setSearchResults(data)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Map marker component
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setSelectedLocation({ lat, lng, name: selectedLocation.name || "" })
      },
    })
    if (!selectedLocation.lat || !selectedLocation.lng) return null
    return <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showButton && (
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
      )}

      <DialogContent className="w-full max-w-3xl p-0 md:rounded-xl rounded-none h-[90dvh] md:h-auto">
        <DialogHeader className="p-6 pb-3 border-b">
          <DialogTitle className="text-xl font-semibold">
            {plan ? "Update Travel Plan" : "Create New Plan"}
          </DialogTitle>
        </DialogHeader>

        <form action={action}>
          <div className="max-h-[calc(100dvh-160px)] md:max-h-[70vh] overflow-y-auto px-6 pb-6 pt-4 space-y-6">
            <FieldGroup className="gap-6">
              {plan && <input type="hidden" name="id" defaultValue={plan.id} />}

              {/* Search Input */}
              <Field className="relative">
                <FieldLabel htmlFor="search">Search Destination</FieldLabel>
                <Input
                  id="search"
                  placeholder="Type city or place"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <ul className="absolute z-50 top-full left-0 right-0 bg-background border rounded-md shadow-md max-h-48 overflow-y-auto mt-1">
                    {searchResults.map((res) => (
                      <li
                        key={res.place_id}
                        className="px-3 py-2 hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setSelectedLocation({
                            lat: parseFloat(res.lat),
                            lng: parseFloat(res.lon),
                            name: res.display_name,
                          })
                          setSearchQuery(res.display_name)
                          setSearchResults([])
                        }}
                      >
                        {res.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </Field>

              {/* Map */}
              <div className="w-full h-64 rounded-xl z-0 overflow-hidden mb-4">
                <MapContainer
                  center={[
                    selectedLocation.lat || 20.5937,
                    selectedLocation.lng || 78.9629,
                  ]}
                  zoom={5}
                  scrollWheelZoom
                  className="h-full w-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker />
                </MapContainer>
              </div>

              {/* Destination Name */}
              <Field>
                <FieldLabel htmlFor="destination">Destination</FieldLabel>
                <Input
                  id="destination"
                  name="destination"
                  value={selectedLocation.name || ""}
                  readOnly
                />
                <GetFieldError state={state} name="destination" />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Bali Summer Trip"
                    defaultValue={getValue("title")}
                  />
                  <GetFieldError state={state} name="title" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="budget">Budget</FieldLabel>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Estimated trip cost"
                    defaultValue={getValue("budget")}
                  />
                  <GetFieldError state={state} name="budget" />
                </Field>
              </div>

              <DateRangePickerField
                label="Trip Duration"
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
                label="Tour Type"
                name="tour_type"
                defaultValue={getValue("tour_type")}
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
                  placeholder={`Format:

Day 1 | Date | Title | Short description
Day 2 | Date | Title | Short description`}
                  defaultValue={getValue("itinerary")}
                />
                <GetFieldError state={state} name="itinerary" />
              </Field>

              <Field>
                <FieldLabel htmlFor="tag">Tag</FieldLabel>
                <Input
                  id="tag"
                  name="tag"
                  placeholder="e.g., Solo, Family, Adventure"
                  defaultValue={getValue("tag")}
                />
                <GetFieldError state={state} name="tag" />
              </Field>
            </FieldGroup>
          </div>

          {/* Hidden coordinates */}
          <input type="hidden" name="latitude" value={selectedLocation.lat || ""} />
          <input type="hidden" name="longitude" value={selectedLocation.lng || ""} />

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
  )
}
