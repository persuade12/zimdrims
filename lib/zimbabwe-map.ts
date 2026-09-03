/** Leaflet uses [lat, lng]. */
export const ZIMBABWE_CENTER: [number, number] = [-19.02, 29.15]

/** Slightly padded country bounds — keeps panning focused on Zimbabwe. */
export const ZIMBABWE_BOUNDS: [[number, number], [number, number]] = [
  [-22.55, 24.9],
  [-15.45, 33.25],
]

export const ZIMBABWE_MIN_ZOOM = 5
export const ZIMBABWE_MAX_ZOOM = 11
export const ZIMBABWE_DEFAULT_ZOOM = 6

/** Display aspect for the map frame (width / height). */
export const ZIMBABWE_ASPECT = 800 / 680

export const CARTO_LIGHT =
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
export const CARTO_DARK =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
export const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
