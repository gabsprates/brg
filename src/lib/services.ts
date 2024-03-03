export const makeService = ({ storage }: { storage: Storage }): App.Service => {
  const LS_TotalKey = "T";

  return {
    getTotalProgress() {
      const saved = storage.getItem(LS_TotalKey);
      return saved ? JSON.parse(saved) : {};
    },

    setTotalProgress(data: { [book in string]: number }) {
      const saved = storage.getItem(LS_TotalKey);
      const obj = saved ? JSON.parse(saved) : {};
      storage.setItem(LS_TotalKey, JSON.stringify({ ...obj, ...data }));
    },

    save(book: string, chapters: number[]) {
      return new Promise<void>((resolve) => {
        this.setTotalProgress({ [book]: chapters.length });
        storage.setItem(book, JSON.stringify(chapters));

        resolve();
      });
    },

    progressOf(book: string) {
      const data = storage.getItem(book);
      if (data) return JSON.parse(data);

      return [];
    },
  };
};
