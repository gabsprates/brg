const LS_TotalKey = "T";

class Service {
  constructor() {
    if (!window.localStorage) {
      throw Error("update your browser");
    }
  }

  getTotalProgress() {
    const saved = localStorage.getItem(LS_TotalKey);
    return saved ? JSON.parse(saved) : {};
  }

  setTotalProgress(data: { [book in string]: number }) {
    const saved = localStorage.getItem(LS_TotalKey);
    const obj = saved ? JSON.parse(saved) : {};
    localStorage.setItem(LS_TotalKey, JSON.stringify({ ...obj, ...data }));
  }

  save(book: string, chapters: number[]) {
    new Promise(resolve => {
      this.setTotalProgress({ [book]: chapters.length });
      localStorage.setItem(book, JSON.stringify(chapters));
      resolve();
    });
  }

  progressOf(book: string): number[] {
    const data = localStorage.getItem(book);
    if (data) return JSON.parse(data);
    return [];
  }
}

export default new Service();
