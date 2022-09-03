export interface Keystore<T> {
  get: (key: string) => Promise<T>;
}

export class KeystoreError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends KeystoreError {}

export class StreamFailedError extends KeystoreError {}
