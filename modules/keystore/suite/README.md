A test suite that can be instantiated in implementing modules.  
Implementing modules will provide a factory for making a keystore.
This means S3, filesystem, Redis etc can all be tested for conformance with the same suite.
