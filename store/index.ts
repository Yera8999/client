import { makeAutoObservable } from "mobx";

class Store {
  clicked = false;
  constructor() {
    makeAutoObservable(this);
  }
  openModal() {
    this.clicked = true;
  }
  closeModal() {
    this.clicked = false;
  }
}
export default new Store();
