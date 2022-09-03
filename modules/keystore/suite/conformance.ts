import type { Keystore } from "../src";
import { NotFoundError } from "../src";

import { nanoid } from "nanoid";

type KeystoreFactory = <T>() => Promise<{
  keystore: Keystore<T>;
  dispose: () => Promise<void>;
}>;

export function launchConformanceSuite(factory: KeystoreFactory) {
  describe("Keystore api", () => {
    interface Stored {
      foo: string;
    }
    let keystore: Keystore<Stored>;
    let dispose: () => Promise<void>;
    beforeEach(async () => {
      ({ keystore, dispose } = await factory<Stored>());
    });
    afterEach(async () => {
      await dispose();
    });

    describe("Saving and retrieving values", () => {
      describe("Keystore.get()", () => {
        test("throws if item absent", async () => {
          const key = nanoid();
          try {
            await keystore.get(key);
          } catch (err) {
            expect(err instanceof NotFoundError);
            expect((err as NotFoundError).message).toBe(`No such key ${key}`);
          }
        });
      });
    });
  });
}
