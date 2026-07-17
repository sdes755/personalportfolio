import * as THREE from "three"

const WIDTH = 256
const HEIGHT = 128
const BODY_DARK = "#101018"

const cache = new Map<string, THREE.CanvasTexture>()

/** Deterministic pseudo-random in [0, 1) — same generator family as the starfield. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mix(a: [number, number, number], b: [number, number, number], t: number): string {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

/**
 * Procedural gas-giant surface: dark tinted body with latitude banding and
 * speckle noise in the category color. Cached per (tint, seed).
 */
export function getPlanetTexture(tintHex: string, seed: number): THREE.CanvasTexture {
  const key = `${tintHex}:${seed}`
  const cached = cache.get(key)
  if (cached) return cached

  const canvas = document.createElement("canvas")
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext("2d")!

  const tint = hexToRgb(tintHex)
  const dark = hexToRgb(BODY_DARK)
  const s = seed * 131

  // Base body — tint pulled well toward the dark surface color
  ctx.fillStyle = mix(dark, tint, 0.22)
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Latitude bands
  const bandCount = 6 + Math.floor(rand(s) * 5)
  let y = 0
  for (let i = 0; i < bandCount && y < HEIGHT; i++) {
    const h = 6 + rand(s + i * 7 + 1) * 22
    const brightness = 0.1 + rand(s + i * 7 + 2) * 0.28
    ctx.fillStyle = mix(dark, tint, brightness)
    ctx.globalAlpha = 0.55 + rand(s + i * 7 + 3) * 0.45
    ctx.fillRect(0, y, WIDTH, h)
    y += h + rand(s + i * 7 + 4) * 10
  }
  ctx.globalAlpha = 1

  // Speckle blotches for surface noise
  for (let i = 0; i < 42; i++) {
    const bx = rand(s + 200 + i * 3) * WIDTH
    const by = rand(s + 201 + i * 3) * HEIGHT
    const rx = 2 + rand(s + 202 + i * 3) * 9
    const bright = rand(s + 203 + i * 3) > 0.65
    ctx.fillStyle = bright ? mix(dark, tint, 0.45) : "rgba(0, 0, 0, 1)"
    ctx.globalAlpha = bright ? 0.14 : 0.1 + rand(s + 204 + i * 3) * 0.1
    ctx.beginPath()
    ctx.ellipse(bx, by, rx, rx * 0.45, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  cache.set(key, texture)
  return texture
}
