const receiptStore = new Map<string, number>();

export const saveReceiptPoints = (id: string, points: number) => {
  receiptStore.set(id, points);
};

export const getReceiptPointsById = (id: string): number | undefined => {
  return receiptStore.get(id);
};
