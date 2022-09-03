import type { Keystore } from "@myorg/keystore";
import { NotFoundError } from "@myorg/keystore";

export class S3Keystore<T> implements Keystore<T> {
  constructor(
    readonly options: Readonly<{
      Bucket: string;
      endpoint?: string;
    }>
  ) {}

  async get(Key: string): Promise<T> {
    throw new NotFoundError(`No such key ${Key}`);
  }
}
