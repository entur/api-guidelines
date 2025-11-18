# Changelog

## [2.0.0](https://github.com/entur/api-guidelines/compare/v1.1.1...v2.0.0) (2025-11-18)


### ⚠ BREAKING CHANGES

* API-523: Added rule that ET-Client-Name header must be required on all operations. And Excluded that header from the entur-headers-hyphenated-pascal-case rule.
* Added new lint rule (language-headers, Error)

### Features

* Added new lint rule (language-headers, Error) ([53a8105](https://github.com/entur/api-guidelines/commit/53a8105134a41511f6b0ae43f6979f603ee0c59d))
* API-523: Added rule that ET-Client-Name header must be required on all operations. And Excluded that header from the entur-headers-hyphenated-pascal-case rule. ([0ff84d7](https://github.com/entur/api-guidelines/commit/0ff84d79b4be056b238e6346c84c09eef266fe42))
* API-548 Add extension x-entur-permissions to declare required permissions ([e22bbd7](https://github.com/entur/api-guidelines/commit/e22bbd7557ee8f5b0ed4c014d173e7b50805939b))
* API-548 Add x-entur-permissions to linter ([bcc0249](https://github.com/entur/api-guidelines/commit/bcc0249b714e1146c6f7a833f24c7751428fd516))
* API-568: Added minimal, required ruleset, used for validating s… ([29c225c](https://github.com/entur/api-guidelines/commit/29c225ce1dd7efb9c1d6c3f63ce47087d2ec7738))
* API-568: Added minimal, required ruleset, used for validating specs. ([c4463b8](https://github.com/entur/api-guidelines/commit/c4463b8e12ba2b7116371d2d563102d489e1d626))
* API-568: Cleanup ([54210d1](https://github.com/entur/api-guidelines/commit/54210d17eef2ebd6cf8ac818cdfad5a16a0adfc3))


### Bug Fixes

* Added missing entur- prefix to some rules ([46344f7](https://github.com/entur/api-guidelines/commit/46344f7d02e26e523dc31664fd74aa708ffbd772))
* Added missing entur- prefix to some rules ([416a06e](https://github.com/entur/api-guidelines/commit/416a06e667d05fe726a2096f148171e79fe0ee8a))
* API-523: Cleaned up code a bit in how operations are found on path objects. ([71486fd](https://github.com/entur/api-guidelines/commit/71486fdaf06b3cebd7fc5673294a173ada4fd0e3))
* API-523: Header "ET-Client-Name" no longer needs to be required. And if missing, it is a warning. ([fdb75e8](https://github.com/entur/api-guidelines/commit/fdb75e8511ad0c5e5de032cbc61991a2cb896243))
* API-523: Header "ET-Client-Name" no longer needs to be required. And if missing, it is a warning. ([0863f0f](https://github.com/entur/api-guidelines/commit/0863f0f5867108182c693af0e30c1c7eb7f7797a))
* API-523: Header "ET-Client-Name" no longer needs to be required.… ([6c9c80b](https://github.com/entur/api-guidelines/commit/6c9c80b234fe94f4746bd578d27b790a03832878))
* API-534: Allow exact path "api-docs", while still failing for an… ([00717dc](https://github.com/entur/api-guidelines/commit/00717dcb5f08e8faf1485cf132f2e756a24b7b43))
* API-534: Allow exact path "api-docs", while still failing for any other path containing word "api". ([dfe41c8](https://github.com/entur/api-guidelines/commit/dfe41c891fb64d7c83b7df7add6cc2df910481db))
* API-548 Fix structure of x-entur-permissions ([b2b8908](https://github.com/entur/api-guidelines/commit/b2b8908b220e192454f1f21543759a36485f4237))
* API-548 Fix structure of x-entur-permissions ([6fae433](https://github.com/entur/api-guidelines/commit/6fae4335aaae554b2e43dfabc213aa196e3d9f67))

## [1.1.1](https://github.com/entur/api-guidelines/compare/v1.1.0...v1.1.1) (2025-08-08)


### Bug Fixes

* API-435: Removed linting rule "entur-headers-no-x-headers". Updated guidelines to show that this is reviewed manually. ([5e05f02](https://github.com/entur/api-guidelines/commit/5e05f02b53cc94d69f6cdd36b7246b93215e3f90))
* Removed linting rule "entur-headers-no-x-headers". ([6079ab2](https://github.com/entur/api-guidelines/commit/6079ab2a674fe747a7c201ae8387817c168eb1c2))

## [1.1.0](https://github.com/entur/api-guidelines/compare/v1.0.1...v1.1.0) (2025-08-05)


### Features

* Api 362 - Reference spec ([f2a8e87](https://github.com/entur/api-guidelines/commit/f2a8e87eaef2e5b95119ae597f665d305b1c38b9))
* API-362: ([b253406](https://github.com/entur/api-guidelines/commit/b253406a749684552074cb21149974937c59c890))
* API-411: Added reference async specs for kafka and pubsub.  ([#55](https://github.com/entur/api-guidelines/issues/55)) ([60b5715](https://github.com/entur/api-guidelines/commit/60b571528945e90114aef8ddbce38145dd0803b9))


### Bug Fixes

* Added issues: write permission ([9959440](https://github.com/entur/api-guidelines/commit/9959440701fa2f93c8c1a553c1b05ff90b1e65e6))
* Added issues: write permission ([41d3dd2](https://github.com/entur/api-guidelines/commit/41d3dd20ea0249fa7999c967a848957d14991181))
* API-362: Added pagination. And some cleanup. ([aede2f9](https://github.com/entur/api-guidelines/commit/aede2f9688230274e0af24e3d36c5c51b9fdee7c))
* API-362: Changed path "sales" to "product" ([5c75a4b](https://github.com/entur/api-guidelines/commit/5c75a4beca2147875992984c88746f8930407450))
* API-362: Improved 4.2 Error Handling ([5d3ccaa](https://github.com/entur/api-guidelines/commit/5d3ccaa601a504cf2c927d7fe96d7bbf8de12b86))
* API-362: page and size query params are integers, not strings. ([f81ed9f](https://github.com/entur/api-guidelines/commit/f81ed9fd16cede21c5cb2a98bcea8afb033da4dd))
* API-362: quoting "example" properties ([7b7443c](https://github.com/entur/api-guidelines/commit/7b7443ce8d7369147ab8f25236796891908d358e))
* API-362: Status is now integer ([60b5c22](https://github.com/entur/api-guidelines/commit/60b5c227f17ffb9b62eb70585d2d894d9a3aad38))
* API-362: Typo ([613cf58](https://github.com/entur/api-guidelines/commit/613cf583dda8a0d0ff9209925a89dddfd9502b7d))
* API-422: Allowing HTTP response 304 (Not Modified). ([be4cb49](https://github.com/entur/api-guidelines/commit/be4cb49615946267cc5966e6f18106c027707077))
* API-422: Allowing HTTP response 304 (Not Modified). Updated section 6.4 Caching & Resource Expiration of the guidelines. ([01c73d7](https://github.com/entur/api-guidelines/commit/01c73d730ae12062c8dd0e5423558da59c06f643))
* Improved messages by making them clearer and more informative. ([#52](https://github.com/entur/api-guidelines/issues/52)) ([6665e28](https://github.com/entur/api-guidelines/commit/6665e2837310b0dd6947231988beeb77a7c4e090))

## [1.0.1](https://github.com/entur/api-guidelines/compare/v1.0.0...v1.0.1) (2025-05-12)


### Bug Fixes

* Api 382 - Rule fixes ([6339b4c](https://github.com/entur/api-guidelines/commit/6339b4ca1ed7cdaee9724d69b052f17d4239dcdb))
* API-382: Do not require support for `application/json` request body media type. ([3546278](https://github.com/entur/api-guidelines/commit/3546278f0fab8be59f1d2d26693f0c790153e9e5))
* API-382: Fixed entur-headers-hyphenated-pascal-case, it had a regex which both failed incorrectly in some cases and succeeded incorrectly in some cases. Also removed unnecessary slashes in rules entur-headers-hyphenated-pascal-case and entur-headers-no-x-headers. ([453e927](https://github.com/entur/api-guidelines/commit/453e927719a67b7b5017c66443a97efdcf262850))

## [1.0.0](https://github.com/entur/api-guidelines/compare/v0.1.0...v1.0.0) (2025-05-08)


### ⚠ BREAKING CHANGES

* API-330: Do not allow localhost / 127.0.0.1 hostnames
* API-330: Do not allow code 204 on GET, but do allow it on POST. Also allow 200 on POST.

### Features

* API-330: Added description of the "sort" parameter. ([b32920f](https://github.com/entur/api-guidelines/commit/b32920f8789646cc430343b7996dd0f2c014e947))
* API-330: Added documentation of security requirements. ([760651a](https://github.com/entur/api-guidelines/commit/760651a311018998fae5c6dbad909a2c7701f64a))
* API-330: Added documentation of security requirements. ([d4844a1](https://github.com/entur/api-guidelines/commit/d4844a10de8c3a4c5ed9d9a59aa7bbea5be7b4e3))
* API-330: Added initial requirements for pagination and sorting. ([6bb4075](https://github.com/entur/api-guidelines/commit/6bb4075ba5a4f934a5145736830d823283d28424))
* API-330: Added initial requirements for pagination and sorting. ([4f9eeb1](https://github.com/entur/api-guidelines/commit/4f9eeb14e263647add4db7df6fb481037380e394))
* API-330: Allow application/problem+xml response if Accept heade… ([6862c9f](https://github.com/entur/api-guidelines/commit/6862c9f7ff35343e8476be1e5dbdac6590d7c16b))
* API-330: Allow application/problem+xml response if Accept header is application/xml. ([960b210](https://github.com/entur/api-guidelines/commit/960b21021a1e2baf41dd0e33b2ecb6a634adb378))
* API-330: Allow http on localhost and 127.0.0.1 ([edf26f0](https://github.com/entur/api-guidelines/commit/edf26f09f07db42ab57c76f40c25271dec64aa01))
* API-330: codes ([d15b43e](https://github.com/entur/api-guidelines/commit/d15b43e32883c6aaeb7bdb195de8af3baef7cf83))
* API-330: Do not allow code 204 on GET, but do allow it on POST. Also allow 200 on POST. ([1708343](https://github.com/entur/api-guidelines/commit/1708343c85beb6a2bb1a9bca2408273632526082))
* API-330: Do not allow localhost / 127.0.0.1 hostnames ([933a961](https://github.com/entur/api-guidelines/commit/933a961929dca3b6d4a556aea94958e4c5a5f66f))
* API-330: Do not allow localhost / 127.0.0.1 hostnames ([940676b](https://github.com/entur/api-guidelines/commit/940676be5a6a3aef7ce5c8d7ca028c48514f7c94))
* API-330: Removed "unless you good reason not to", as this is already part of the SHOULD definition. ([1310cb4](https://github.com/entur/api-guidelines/commit/1310cb4b40a717067c5f7c45277e59a10f5f99fa))
* API-330: Removed requirement that API:s MUST support JSON. This is not reasonable in some cases. For example, for some endpoints,  JSONL is more suiting, and for others only XML (in case of NeTEx endpoints for example). ([7d92a39](https://github.com/entur/api-guidelines/commit/7d92a391adaab31a3e8519de4f776f8cc2b954ce))
* API-330: Removed requirement that API:s MUST support JSON. This… ([919bff5](https://github.com/entur/api-guidelines/commit/919bff587bf867847ea168e723b96085b583f95c))


### Bug Fixes

* Allow statuscode 400 for get and delete ([#35](https://github.com/entur/api-guidelines/issues/35)) ([5c4bb42](https://github.com/entur/api-guidelines/commit/5c4bb421183f20dbe59a6d1f1765fd67fbba0949))
* API-330: Clarified that "instance" in error response must be an … ([0bcfff4](https://github.com/entur/api-guidelines/commit/0bcfff40285714d1d457c67bc3e68f9f2e592dca))
* API-330: Clarified that "instance" in error response must be an Absolute URI. ([7694c8e](https://github.com/entur/api-guidelines/commit/7694c8e1c45e7b65a576f4884ccf8843f36700b2))
* do not require content-type for statuscode 204. closes [#26](https://github.com/entur/api-guidelines/issues/26) ([#37](https://github.com/entur/api-guidelines/issues/37)) ([3918f86](https://github.com/entur/api-guidelines/commit/3918f865c1ac901a0770e47ab44e20e948b632a2))

## [0.1.0](https://github.com/entur/api-guidelines/compare/v0.0.1...v0.1.0) (2025-03-25)


### Features

* add pr-validate ([#22](https://github.com/entur/api-guidelines/issues/22)) ([82bb06b](https://github.com/entur/api-guidelines/commit/82bb06b35f3ae7b98aec67c373eed18de1baae76))
