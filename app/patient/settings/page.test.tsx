import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PatientSettingsPage from "@/app/patient/settings/page"

describe("PatientSettingsPage", () => {
  it("keeps profile access and centralizes wallet entry and faq content", () => {
    render(<PatientSettingsPage />)

    expect(screen.getByText(/profile and settings/i)).toBeInTheDocument()
    expect(screen.getAllByText(/wallet/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/wallet and loyalty help/i)).toBeInTheDocument()
    expect(screen.getByText(/legacy engagement points/i)).toBeInTheDocument()
  })
})
