export const makeService = ({ storage }: { storage: Storage }): App.Service => {
  const LS_TotalKey = "T";

  return {
    getTotalProgress() {
      const saved = storage.getItem(LS_TotalKey);
      return saved ? JSON.parse(saved) : {};
    },

    setTotalProgress(data) {
      const saved = storage.getItem(LS_TotalKey);
      const obj = saved ? JSON.parse(saved) : {};
      storage.setItem(LS_TotalKey, JSON.stringify({ ...obj, ...data }));
    },

    save(book, chapters) {
      return new Promise<void>((resolve) => {
        this.setTotalProgress({ [book]: chapters.length });
        storage.setItem(book, JSON.stringify(chapters));

        resolve();
      });
    },

    progressOf(book) {
      const data = storage.getItem(book);
      if (data) return JSON.parse(data);

      return [];
    },

    async dump(bookKeys) {
      const result = {
        total: this.getTotalProgress(),
        books: {} as Record<string, number[]>,
      };

      bookKeys.forEach((book) => {
        const data = this.progressOf(book);

        if (data.length) {
          result.books[book] = data;
        }
      });

      return result;
    },

    async loadBatch(data) {
      Object.entries(data.books).forEach(([book, chapters]) => {
        this.save(book, chapters);
      });
    },
  };
};
