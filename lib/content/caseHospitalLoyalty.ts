export const caseHospitalSupport = {
  hotline: "0800 211 005",
  whatsapp: "0764 209 889",
  primaryEmail: "info@casemedservices.org",
  organizationEmail: "casehospital@casemedservices.org",
  website: "www.casemedservices.org",
  address: "Plot 69/71 Buganda Road, P.O. Box 4547 Kampala",
  phoneBlock: "0414 250 362 / 0414 345 603 / 0312 261 123",
  neutralSupportMessage:
    "Please contact support for assistance regarding special account situations.",
} as const

export const caseHospitalVerificationMethods = [
  "Physical Loyalty Card",
  "Card Number",
  "Registered Phone Number",
] as const

export const caseHospitalEligibleServices = [
  "Laboratory",
  "Pharmacy",
  "Radiology",
  "Doctor’s Consultation Fees",
] as const

export const caseHospitalAffiliateClinics = [
  "Case Hospital Buganda Road",
  "Case Medcare Naalya",
  "Case Medcare Kira",
  "Case Medcare Entebbe",
  "Case Medcare Jinja",
  "Case Medcare Kasese",
] as const

export const caseHospitalFaqHighlights = [
  {
    question: "What is the Case Hospital Loyalty Program?",
    answer:
      "A rewards initiative designed to appreciate patients’ loyalty and continued trust in Case Hospital healthcare services.",
  },
  {
    question: "How does the wallet work?",
    answer:
      "Patients can top up cash in advance, then earn a 5% bonus on every cash top-up. That bonus is credited within 24 hours.",
  },
  {
    question: "Where can bonus points be redeemed?",
    answer:
      "Bonus points are redeemable for Laboratory, Pharmacy, Radiology, and Doctor’s Consultation Fees at Case Hospital and participating affiliate clinics.",
  },
  {
    question: "What if the card is lost or forgotten?",
    answer:
      "Customer care can verify the account using the physical card, the card number, or the registered phone number. Lost cards should be reported immediately for replacement support.",
  },
] as const
