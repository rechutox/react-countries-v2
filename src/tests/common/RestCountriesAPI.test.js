import API from "../../common/RestCountriesAPI";

describe("::GetAll", () => {
  it("Should get a non-empty array", async () => {
    const list = await API.getAll();
    expect(Array.isArray(list)).toBeTruthy();
    expect(list.length).toBeGreaterThan(0);
  });

  it("Should include only the specified fields for each item", async () => {
    const fields = ["name", "alpha2Code"];
    const list = await API.getAll(fields);
    const obj = list[0];
    expect(Object.keys(obj).every(key => fields.includes(key))).toBeTruthy();
  });
});

describe("::GetByCode", () => {
  it("Should get the correct country", async () => {
    const country = await API.getByCode("ven");
    expect(country.name).toBe("Venezuela (Bolivarian Republic of)");
  });

  it("Should get only the specified fields", async () => {
    const fields = ["name", "alpha2Code"];
    const country = await API.getByCode("ven", fields);
    expect(
      Object.keys(country).every(key => fields.includes(key)),
    ).toBeTruthy();
  });
});
