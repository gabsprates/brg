type Progress = { [index in string]: number[] };

class Service {
  progress: Progress;

  constructor() {
    if (!window.localStorage) {
      throw Error("update your browser");
    }

    this.progress = JSON.parse(localStorage.getItem("prg") || "{}");

    this.save = this.save.bind(this);
    this.showProgress = this.showProgress.bind(this);
  }

  save() {
    localStorage.setItem("prg", JSON.stringify(this.progress));
  }

  showProgress() {
    console.log(this.progress);
  }
}

export default new Service();
