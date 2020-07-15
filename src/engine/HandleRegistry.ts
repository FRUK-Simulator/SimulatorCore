import { ISimulatorEvent } from "./specs/CoreSpecs";

export class HandleRegistry {
  private _invalidationCallbacks: Map<string, () => void> = new Map<
    string,
    () => void
  >();

  private _simulationEventCallbacks: Map<
    string,
    (evt: ISimulatorEvent) => void
  > = new Map<string, () => void>();

  registerHandle(
    objectGuid: string,
    invalidateCb: () => void,
    simEventCb: (evt: ISimulatorEvent) => void
  ): void {
    this._invalidationCallbacks.set(objectGuid, invalidateCb);
    this._simulationEventCallbacks.set(objectGuid, simEventCb);
  }

  emitSimulationEvent(guid: string, evt: ISimulatorEvent): void {
    if (this._simulationEventCallbacks.has(guid)) {
      const simEventCb = this._simulationEventCallbacks.get(guid);
      simEventCb(evt);
    }
  }

  invalidateHandle(guid: string): void {
    if (this._invalidationCallbacks.has(guid)) {
      const invalidationCb = this._invalidationCallbacks.get(guid);
      invalidationCb();
    }
  }

  deleteHandle(guid: string): void {
    this.invalidateHandle(guid);
    this._invalidationCallbacks.delete(guid);
    this._simulationEventCallbacks.delete(guid);
  }

  invalidateAllHandles(): void {
    this._invalidationCallbacks.forEach((invalidationCb) => {
      invalidationCb();
    });
  }

  deleteAllHandles(): void {
    this.invalidateAllHandles();
    this._invalidationCallbacks.clear();
    this._simulationEventCallbacks.clear();
  }
}
