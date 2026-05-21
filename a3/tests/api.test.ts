import { describe, expect, test } from "vitest";
import { calculateCollection } from "../services/api";

describe("calculateCollection", () => {
  test("returns $20 for General Waste", async () => {
    // Checks that General Waste returns correct price
    const result: any = await calculateCollection(
      "General Waste"
    );

    expect(result.collectionPrice).toBe(20);
  });

  test("returns $15 for Recycling", async () => {
    // Checks that Recycling returns correct price
    const result: any = await calculateCollection(
      "Recycling"
    );

    expect(result.collectionPrice).toBe(15);
  });

  test("returns $35 for Hard Rubbish", async () => {
    // Checks that Hard Rubbish returns correct price
    const result: any = await calculateCollection(
      "Hard Rubbish"
    );

    expect(result.collectionPrice).toBe(35);
  });
});