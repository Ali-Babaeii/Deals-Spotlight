import { Deal, FilterState } from "../src/types";
import { sortDeals, applyFilters } from "../src/lib/dealFilters";

function makeDeals(...overrides: Partial<Deal>[]): Deal[] {
  return overrides.map(
    (o, i): Deal => ({
      id: `p-${i}`,
      title: `Deal ${i}`,
      brand: "ACME",
      category: "phones",
      price: 100 + i * 50,
      originalPrice: 500,
      discountPercent: 20 + i * 5,
      refurbedScore: 70 + i * 10,
      description: "",
      condition: "good",
      rating: 4,
      reviewCount: 10,
      inStock: true,
      ...o,
    }),
  );
}

describe("sortDeals", () => {
  const deals = makeDeals(
    { price: 300, refurbedScore: 80, discountPercent: 40 },
    { price: 100, refurbedScore: 95, discountPercent: 20 },
    { price: 200, refurbedScore: 70, discountPercent: 55 },
  );

  test("price_asc: cheapest first", () => {
    expect(sortDeals(deals, "price_asc").map((d) => d.price)).toEqual([
      100, 200, 300,
    ]);
  });

  test("price_desc: most expensive first", () => {
    expect(sortDeals(deals, "price_desc").map((d) => d.price)).toEqual([
      300, 200, 100,
    ]);
  });

  test("score_desc: highest score first", () => {
    expect(sortDeals(deals, "score_desc").map((d) => d.refurbedScore)).toEqual([
      95, 80, 70,
    ]);
  });

  test("discount_desc: largest discount first", () => {
    expect(
      sortDeals(deals, "discount_desc").map((d) => d.discountPercent),
    ).toEqual([55, 40, 20]);
  });
});

describe("applyFilters", () => {
  const deals = makeDeals(
    { refurbedScore: 65, category: "phones" },
    { refurbedScore: 80, category: "laptops" },
    { refurbedScore: 93, category: "phones" },
  );

  const base: FilterState = {
    sortKey: "score_desc",
    minScore: 0,
    category: null,
  };

  test("minScore 0 returns all deals", () => {
    expect(applyFilters(deals, base)).toHaveLength(3);
  });

  test("minScore filters out deals below threshold", () => {
    const result = applyFilters(deals, { ...base, minScore: 80 });
    expect(result).toHaveLength(2);
    expect(result.every((d) => d.refurbedScore >= 80)).toBe(true);
  });

  test("category filter returns only matching category", () => {
    const result = applyFilters(deals, { ...base, category: "phones" });
    expect(result).toHaveLength(2);
  });
});
