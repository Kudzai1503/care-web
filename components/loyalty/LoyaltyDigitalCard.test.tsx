import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LoyaltyDigitalCard } from "@/components/loyalty/LoyaltyDigitalCard"
import { caseLoyaltyAccount, deriveWallet, initialWalletLedgerEntries } from "@/lib/loyalty"

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

describe("LoyaltyDigitalCard", () => {
  it("renders wallet account details and flips between card faces", () => {
    render(
      <LoyaltyDigitalCard
        account={caseLoyaltyAccount}
        wallet={deriveWallet(initialWalletLedgerEntries)}
      />
    )

    expect(screen.getByText(caseLoyaltyAccount.fullName)).toBeInTheDocument()
    expect(screen.getAllByText(/account number/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText("2600455028").length).toBeGreaterThan(0)
    expect(screen.getAllByText("UGX").length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole("button", { name: /flip card/i }))
    expect(screen.getByRole("button", { name: /show front/i })).toBeInTheDocument()
  })
})
