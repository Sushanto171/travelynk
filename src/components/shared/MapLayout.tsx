/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

// Fix default Leaflet marker icon in production/bundlers
// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

interface MarkerData {
  lat: number
  lng: number
  title?: string
}

interface PlanMapProps {
  markers: MarkerData[]           // Accept one or more markers
  zoom?: number                   // Default zoom level
  height?: string                 // Tailwind class, e.g., "h-40"
  interactive?: boolean           // Enable dragging & scroll
}

export function MapLayout({
  markers,
  zoom = 10,
  height = "h-40",
  interactive = false,
}: PlanMapProps) {
  if (!markers || markers.length === 0) return null

  // Center map on first marker
  const center = [markers[0].lat, markers[0].lng] as [number, number]

  return (
    <div className={`${height} w-full z-0 rounded-xl overflow-hidden`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lat, marker.lng]}>
            {marker.title && <Popup>{marker.title}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
