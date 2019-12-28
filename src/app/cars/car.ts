export class Car {
  carName: string;
  engine: string;
  // Constructor
  // (accepts a value so you can initialize engine)
  constructor(
    carName: string,
    engine: string) {
      this.carName = carName;
      this.engine = engine;
  }
}
