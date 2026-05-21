export async function calculateCollection(binType: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let price = 0;

      if (binType === "General Waste") {
        price = 20;
      } else if (binType === "Recycling") {
        price = 15;
      } else if (binType === "Green Waste") {
        price = 18;
      } else if (binType === "Hard Rubbish") {
        price = 35;
      }

      resolve({
        success: true,
        collectionPrice: price,
      });
    }, 1500);
  });
}