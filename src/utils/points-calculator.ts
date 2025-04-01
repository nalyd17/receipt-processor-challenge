import { Item, Receipt } from "../validators/receipt.validator";

function pointsForRetailerName(retailer: string): number {
  return retailer.replace(/[^A-Za-z0-9]/g, "").length;
}

function pointsForTotal(total: number): number {
  let points = 0;

  points += total % 1 === 0 ? 50 : 0;
  points += total % 0.25 === 0 ? 25 : 0;

  return points;
}

function pointsForItemCount(items: Item[]): number {
  return Math.floor(items.length / 2) * 5;
}

function pointsForItemDescriptions(receipt: Receipt): number {
  return receipt.items.reduce((total, item) => {
    const trimmed = item.shortDescription.trim();
    if (trimmed.length % 3 === 0) {
      total += Math.ceil(item.price * 0.2);
    }
    return total;
  }, 0);
}

function pointsForDayPurchased(purchaseDate: Date): number {
  return purchaseDate.getDate() % 2 === 1 ? 6 : 0;
}

function pointsForTimePurchased(purchaseTime: {
  hour: number;
  minute: number;
}): number {
  return (purchaseTime.hour === 14 && purchaseTime.minute > 0) ||
    purchaseTime.hour === 15
    ? 10
    : 0;
}

export function calculatePoints(receipt: Receipt): number {
  let totalPoints = 0;

  totalPoints += pointsForRetailerName(receipt.retailer);
  totalPoints += pointsForTotal(receipt.total);
  totalPoints += pointsForItemCount(receipt.items);
  totalPoints += pointsForItemDescriptions(receipt);
  totalPoints += pointsForDayPurchased(receipt.purchaseDate);
  totalPoints += pointsForTimePurchased(receipt.purchaseTime);

  return totalPoints;
}
