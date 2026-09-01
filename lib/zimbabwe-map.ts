export const ZIMBABWE_ASPECT = 800 / 680

/** Base map dimensions used for projection tuning. */
export const BASE_MAP_WIDTH = 520
export const BASE_MAP_HEIGHT = Math.round(BASE_MAP_WIDTH / ZIMBABWE_ASPECT)

/** Mercator settings that fit Zimbabwe in the base canvas. */
export const ZIMBABWE_PROJECTION = {
  center: [29.1, -19.05] as [number, number],
  scale: 2650,
}

export function projectionConfigForSize(width: number) {
  return {
    center: ZIMBABWE_PROJECTION.center,
    scale: ZIMBABWE_PROJECTION.scale * (width / BASE_MAP_WIDTH),
  }
}
