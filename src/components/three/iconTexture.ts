import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as THREE from "three"
import { glyphs } from "@/lib/techIcons"

const TEXTURE_SIZE = 128
/** icon occupies the middle of the texture; rest is transparent padding */
const ICON_INSET = 16

const cache = new Map<string, Promise<THREE.CanvasTexture | null>>()

function svgMarkup(name: string): string | null {
  const glyph = glyphs[name]
  if (!glyph) return null
  if (glyph.kind === "brand") {
    const color = glyph.color ?? `#${glyph.icon.hex}`
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${color}" d="${glyph.icon.path}"/></svg>`
  }
  return renderToStaticMarkup(createElement(glyph.icon, { color: "#b4b4c0", size: 24 }))
}

function rasterize(markup: string): Promise<THREE.CanvasTexture | null> {
  return new Promise((resolve) => {
    const blob = new Blob([markup], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = TEXTURE_SIZE
      canvas.height = TEXTURE_SIZE
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        URL.revokeObjectURL(url)
        resolve(null)
        return
      }
      const side = TEXTURE_SIZE - ICON_INSET * 2
      ctx.drawImage(img, ICON_INSET, ICON_INSET, side, side)
      URL.revokeObjectURL(url)
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = 4
      resolve(texture)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(null)
    }
    img.src = url
  })
}

/** Rasterizes a tech's SVG glyph (brand or lucide fallback) into a cached CanvasTexture. */
export function getIconTexture(name: string): Promise<THREE.CanvasTexture | null> {
  const cached = cache.get(name)
  if (cached) return cached
  const markup = svgMarkup(name)
  const promise = markup ? rasterize(markup) : Promise.resolve(null)
  cache.set(name, promise)
  return promise
}
