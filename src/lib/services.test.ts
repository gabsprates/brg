import { makeService } from "./services";

describe("Service: service", () => {
  const database = {
    T: JSON.stringify({ Aa: 1, Bb: 2 }),
    Aa: JSON.stringify([0]),
    Bb: JSON.stringify([0, 1]),
    Cc: JSON.stringify([]),
  };

  const mockedStorage: Storage = {
    length: Object.keys(database).length,

    clear() {},

    getItem(key: keyof typeof database) {
      return database[key];
    },

    key() {
      return "";
    },

    removeItem(key: keyof typeof database) {
      delete database[key];
    },

    setItem(key: keyof typeof database, value) {
      database[key] = value;
    },
  };

  it("should return dump based on bookKeys", async () => {
    const service = makeService({ storage: mockedStorage });

    const dump = await service.dump(["Aa", "Bb", "Cc"]);

    expect(dump).toEqual({
      total: { Aa: 1, Bb: 2 },
      books: {
        Aa: [0],
        Bb: [0, 1],
      },
    });
  });
});
