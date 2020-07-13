export interface IRobotHandle {
  setMotorPower(channel: number, value: number): void;
  getAnalogInput(channel: number): number;
}
