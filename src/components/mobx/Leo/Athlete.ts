import { makeObservable, observable, action } from "mobx";

class Athlete {
  name: string;
  age: number;
  teamHistory: string[];
  salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.teamHistory = [];
    this.salary = salary;

    makeObservable(this, {
      tradePlayer: action,
      wishHappyBirthday: action,
      name: observable,
      age: observable,
      teamHistory: true,
      salary: true,
    });
  }

  wishHappyBirthday() {
    this.age++;
  }

  tradePlayer(team: string) {
    this.teamHistory.push(team);
  }
}

export default Athlete;
