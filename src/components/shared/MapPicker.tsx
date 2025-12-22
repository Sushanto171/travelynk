/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Input } from "@/components/ui/input"

// Fix default Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

interface MapPickerProps {
  lat: number
  lng: number
  onChange: (lat: number, lng: number, name: string) => void
}

function LocationMarker({ onChange }: { onChange: (lat: number, lng: number, name: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])
      // Simple reverse-geocode: use Nominatim (free OpenStreetMap API)
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          const displayName = data.display_name || "Selected location"
          onChange(lat, lng, displayName)
        })
    },
  })
  return position === null ? null : <Marker position={position} />
}

export function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden mb-4">
      <MapContainer center={[lat, lng]} zoom={5} scrollWheelZoom className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onChange={onChange} />
      </MapContainer>
    </div>
  )
}
