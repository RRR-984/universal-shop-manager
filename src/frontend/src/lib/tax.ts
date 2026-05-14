import { TaxSystem } from "../types";
import type { TaxCalculationResult } from "../types";

export function calculateTax(
  amount: number,
  taxSystem: TaxSystem,
  taxRate: number,
  inclusive = false,
): TaxCalculationResult {
  const rate = taxRate / 100;

  let subtotal: number;
  let taxAmount: number;

  if (inclusive) {
    // Tax is already included in amount
    subtotal = amount / (1 + rate);
    taxAmount = amount - subtotal;
  } else {
    subtotal = amount;
    taxAmount = amount * rate;
  }

  const total = subtotal + taxAmount;

  switch (taxSystem) {
    case TaxSystem.GST: {
      // Intra-state: CGST + SGST split equally
      const half = taxAmount / 2;
      return {
        taxType: "GST",
        subtotal,
        taxAmount,
        total,
        breakdown: {
          cgst: half,
          sgst: half,
          igst: 0,
        },
      };
    }
    case TaxSystem.VAT:
      return {
        taxType: "VAT",
        subtotal,
        taxAmount,
        total,
        breakdown: { vat: taxAmount },
      };
    case TaxSystem.SalesTax:
      return {
        taxType: "Sales Tax",
        subtotal,
        taxAmount,
        total,
        breakdown: { salesTax: taxAmount },
      };
    case TaxSystem.Generic: {
      return {
        taxType: "Tax",
        subtotal,
        taxAmount,
        total,
        breakdown: { generic: taxAmount },
      };
    }
  }
}

export function calculateGSTInter(
  amount: number,
  taxRate: number,
  inclusive = false,
): TaxCalculationResult {
  const rate = taxRate / 100;
  const subtotal = inclusive ? amount / (1 + rate) : amount;
  const taxAmount = inclusive ? amount - subtotal : amount * rate;
  const total = subtotal + taxAmount;
  return {
    taxType: "GST (Inter-State)",
    subtotal,
    taxAmount,
    total,
    breakdown: { cgst: 0, sgst: 0, igst: taxAmount },
  };
}

export function formatTaxBreakdown(
  result: TaxCalculationResult,
  currencySymbol: string,
): string[] {
  const lines: string[] = [];
  const { breakdown } = result;

  if (breakdown.cgst !== undefined && breakdown.cgst > 0) {
    lines.push(`CGST: ${currencySymbol}${breakdown.cgst.toFixed(2)}`);
  }
  if (breakdown.sgst !== undefined && breakdown.sgst > 0) {
    lines.push(`SGST: ${currencySymbol}${breakdown.sgst.toFixed(2)}`);
  }
  if (breakdown.igst !== undefined && breakdown.igst > 0) {
    lines.push(`IGST: ${currencySymbol}${breakdown.igst.toFixed(2)}`);
  }
  if (breakdown.vat !== undefined && breakdown.vat > 0) {
    lines.push(`VAT: ${currencySymbol}${breakdown.vat.toFixed(2)}`);
  }
  if (breakdown.salesTax !== undefined && breakdown.salesTax > 0) {
    lines.push(`Sales Tax: ${currencySymbol}${breakdown.salesTax.toFixed(2)}`);
  }
  if (breakdown.generic !== undefined && breakdown.generic > 0) {
    lines.push(`Tax: ${currencySymbol}${breakdown.generic.toFixed(2)}`);
  }
  return lines;
}
