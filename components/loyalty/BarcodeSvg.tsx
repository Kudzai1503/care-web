"use client"

import { useEffect, useId, useMemo } from "react"
import JsBarcode from "jsbarcode"

interface BarcodeSvgProps {
  value: string
  className?: string
}

export function BarcodeSvg({ value, className }: BarcodeSvgProps) {
  const id = useId()
  const svgId = useMemo(() => `barcode-${id.replace(/:/g, "")}`, [id])

  useEffect(() => {
    const node = document.getElementById(svgId)
    if (!node) return

    JsBarcode(node, value, {
      format: "CODE128",
      displayValue: false,
      margin: 0,
      background: "transparent",
      lineColor: "#111111",
      width: 1.6,
      height: 44,
    })
  }, [svgId, value])

  return <svg id={svgId} className={className} aria-label={`Barcode for ${value}`} />
}
