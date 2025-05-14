import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './mapa.css'

// Tipo das coordenadas
type Coordenadas = {
  lat: number
  lon: number
}

// Props do FlyToLocation
type FlyToLocationProps = {
  coordenadas?: Coordenadas
}

function FlyToLocation({ coordenadas }: FlyToLocationProps) {
  const map = useMap()

  useEffect(() => {
    if (coordenadas) {
      map.flyTo([coordenadas.lat, coordenadas.lon], 15)
    }
  }, [coordenadas, map])

  return null
}

// Props do componente principal
type MapaProps = {
  coordenadas?: Coordenadas
}

function Mapa({ coordenadas }: MapaProps) {
  const center: [number, number] = coordenadas
    ? [coordenadas.lat, coordenadas.lon]
    : [-23.5291403, -46.8976514]

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordenadas && (
        <Marker position={[coordenadas.lat, coordenadas.lon]} />
      )}
      <FlyToLocation coordenadas={coordenadas} />
    </MapContainer>
  )
}

export default Mapa
