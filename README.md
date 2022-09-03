# Reproduction of circularity

This repro demonstrates how a combination of tools...

- pnpm
- jest
- typescript
  ...fail to be able to run a simple suite which has no obvious complexity but seems to create a circular module issue.

## A working call

$ It's possible to demonstrate that there's nothing wrong with the actual code path. Running the following performs exactly as expected...

```
$ npx ts-node modules/keystore/src/exampleThrow.ts
All is well
```

## The error

The error looks like this...

```
│   ● Keystore api › Saving and retrieving values › Keystore.get() › throws if item absent
│     expect(received).toBe(expected) // Object.is equality
│     Expected: "No such key PS7ckyTPBHZ4NI2_yyxQs"
│     Received: "keystore_1.NotFoundError is not a constructor"
```

The 'offending' line is in the deliberately trivial `S3Keystore`. Attempting to use `new` to create a `NotFoundError`, ironically, causes an error...

```typescript
  async get(Key: string): Promise<T> {
    throw new NotFoundError(`No such key ${Key}`);
  }
```

The 'not a constructor' error associated with a module alias like this is normally owing to a circularity issue meaning that `NotFoundError` was not defined before it was used, but according to [dpdm](https://www.npmjs.com/package/dpdm) there is no circularity issue (circularity is checked before running tests in the `qa` task).

## Recreating the error

The failure can be recreated by...

```bash
npm install -g pnpm
pnpm install
pnpm run qa
```

# A theory

The suite is composed using `modules/keystore/suite/conformance.ts`. This is a factory for a test suite. It accepts a factory method for the Object to test, and then calls `describe` and `test` to construct a jest suite as usual so that it's possible to test the conformance of multiple implementations. In this draft there is only one implementation - the S3Keystore, but in the end this suite is expected to be reused to verify multiple different implementations. Perhaps there is a weird interaction around jest bundling here?
