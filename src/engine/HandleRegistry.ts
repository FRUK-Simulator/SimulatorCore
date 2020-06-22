export class HandleRegistry {
  private _invalidationCallbacks: Map<string, () => void> = new Map<
    string,
    () => void
  >();

  registerHandle(objectGuid: string, invalidateCb: () => void): void {
    this._invalidationCallbacks.set(objectGuid, invalidateCb);
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
  }

  invalidateAllHandles(): void {
    this._invalidationCallbacks.forEach((invalidationCb) => {
      invalidationCb();
    });
  }

  deleteAllHandles(): void {
    this.invalidateAllHandles();
    this._invalidationCallbacks.clear();
  }
}
