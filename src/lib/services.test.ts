import { makeService } from "./services";

describe("Service: service", () => {
  const makeMockedStorage = (database: Record<string, string>): Storage => {
    return {
      length: Object.keys(database).length,
      clear() {},
      key() {
        return "";
      },

      getItem(key) {
        return database[key];
      },

      removeItem(key) {
        delete database[key];
      },

      setItem(key, value) {
        database[key] = value;
      },
    };
  };

  it("should return dump based on bookKeys", async () => {
    const service = makeService({
      storage: makeMockedStorage({
        T: JSON.stringify({ Aa: 1, Bb: 2 }),
        Aa: JSON.stringify([0]),
        Bb: JSON.stringify([0, 1]),
        Cc: JSON.stringify([]),
      }),
    });

    const dump = await service.dump(["Aa", "Bb", "Cc"]);

    expect(dump).toEqual({
      total: { Aa: 1, Bb: 2 },
      books: { Aa: [0], Bb: [0, 1] },
    });
  });

  it("should save data into databae", async () => {
    const service = makeService({ storage: makeMockedStorage({}) });
    const data = {
      total: { Aa: 1, Bb: 2 },
      books: { Aa: [0], Bb: [0, 1] },
    };

    let dump = await service.dump([]);
    expect(dump).toEqual({ total: {}, books: {} });

    await service.loadBatch(data);

    dump = await service.dump(Object.keys(data.books));
    expect(dump).toEqual(data);
  });
});
