# Changelog

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
