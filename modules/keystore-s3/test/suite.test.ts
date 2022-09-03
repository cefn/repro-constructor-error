import { customAlphabet } from "nanoid";

import { S3Keystore } from "../src";
import { launchConformanceSuite } from "../../keystore/suite/conformance";

const endpoint = "http://localhost:4566";

const createBucketName = customAlphabet("1234567890abcdef", 10);

const keystoreFactory = async <T>() => {
  // create a new bucket
  const Bucket = createBucketName();
  console.log("Create a bucket here");

  const keystore = new S3Keystore<T>({
    Bucket,
    endpoint,
  });

  return {
    keystore,
    async dispose() {
      console.log("Dispose of bucket here");
    },
  };
};

launchConformanceSuite(keystoreFactory);
