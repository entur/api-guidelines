# Changelog

## [2.2.0](https://github.com/entur/api-guidelines/compare/v2.1.0...v2.2.0) (2026-02-23)


### Features

* Add ci workflow to check that linting works ([#93](https://github.com/entur/api-guidelines/issues/93)) ([4c719cb](https://github.com/entur/api-guidelines/commit/4c719cb93295a590ffb658c4de105c8d7c0a2a0f))
* Add lint rules to more x-entur-metadata fields ([#92](https://github.com/entur/api-guidelines/issues/92)) ([a12c96c](https://github.com/entur/api-guidelines/commit/a12c96c011d6758b4aee3b11be387fdfe0c85390))

## [2.1.0](https://github.com/entur/api-guidelines/compare/v2.0.2...v2.1.0) (2026-01-29)


### Features

* ETU-66252 Add guidelines for merging apis ([f6065e4](https://github.com/entur/api-guidelines/commit/f6065e4e338eba5b65b93b19d413a0535da6676a))
* ETU-66252 Add guidelines for merging specs ([0d545a1](https://github.com/entur/api-guidelines/commit/0d545a1f3ae075dac1f80698b1c87299aebc6ab1))
* ETU-66252 Add lint rule that parentId is formatted correctly ([46845a2](https://github.com/entur/api-guidelines/commit/46845a260c9b604cdb9c0936aabcdb1923d1e6ef))


### Bug Fixes

* Clarify that x-entur-metadata.id should identify spec, not service ([#90](https://github.com/entur/api-guidelines/issues/90)) ([7e1cfe3](https://github.com/entur/api-guidelines/commit/7e1cfe3d82943a1fde2d1a7e00015db13545b684))

## [2.0.2](https://github.com/entur/api-guidelines/compare/v2.0.1...v2.0.2) (2026-01-14)


### Bug Fixes

* Allowing HTTP response code 423 for delete, post, put, patch. ([#87](https://github.com/entur/api-guidelines/issues/87)) ([5bc3566](https://github.com/entur/api-guidelines/commit/5bc3566a1c767a5423e6c893735dd43cc7c72455))
* ETU-66692: Added custom function requireExampleOrRef which looks for examples in components referenced in schema.items (when schema.type == 'array'). ([#84](https://github.com/entur/api-guidelines/issues/84)) ([1d47976](https://github.com/entur/api-guidelines/commit/1d47976846e1f1f87e14204931d00a79a9fda6bc))
* ETU-66692: schema properties which have type: array and  items { $ref } no longer needs an example. ([5358854](https://github.com/entur/api-guidelines/commit/53588546e810621df578ab733d71d49d833dddb0))
* Severity of rule 'entur-rfc-9457-content-type' changed to warning. ([#86](https://github.com/entur/api-guidelines/issues/86)) ([60395da](https://github.com/entur/api-guidelines/commit/60395daad535bd67eacccf9190156e478b6b8102))

## [2.0.1](https://github.com/entur/api-guidelines/compare/v2.0.0...v2.0.1) (2025-12-02)


### Bug Fixes

* API-571: Added info about "info.title" linting in guidelines. Moved linting rules to correct sections, so that it matches guidelines. ([#77](https://github.com/entur/api-guidelines/issues/77)) ([beec7fe](https://github.com/entur/api-guidelines/commit/beec7fe086a65c31cb6796647b6143874cd4d646))
* API-578: Header "ET-Client-Name" not necessary. ([#79](https://github.com/entur/api-guidelines/issues/79)) ([45c5c4d](https://github.com/entur/api-guidelines/commit/45c5c4d9303f751c5b95230833d8afcb24d5cdc0))

## [2.0.0](https://github.com/entur/api-guidelines/compare/v1.1.1...v2.0.0) (2025-11-18)

### ⚠ BREAKING CHANGES

* Added new lint rule (language-headers, Error)

### Features

* API-523: Added rule that ET-Client-Name header should be allowed on all operations. And Excluded that header from the entur-headers-hyphenated-pascal-case rule.
* API-548 Add extension x-entur-permissions to declare required permissions

### Bug Fixes

* API-534: Allow exact path "api-docs", while still failing for any other path containing word "api". ([dfe41c8](https://github.com/entur/api-guidelines/commit/dfe41c891fb64d7c83b7df7add6cc2df910481db))

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
