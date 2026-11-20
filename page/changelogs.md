---
title: Changelog Guidelines
layout: default
nav_order: 2
has_children: false
has_toc: false
---

# Changelog Guidelines

{: .no_toc }

## Table of contents

{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
* TOC placeholder (the list below is generated automatically)
{:toc}
</details>

## 1. Introduction

### 1.1 Audience and scope

These guidelines are for developers, product owners, AI agents and others who write or review technical changelogs. They do not apply to changelogs for a team's own use, or to release notes for non-technical readers.

### 1.2 Purpose

- To standardise rules and best practices for changelogs
- To contribute to a consistent user experience for readers
- To help AI agents draft and review changelogs

### 1.3 Contributing

For details on how to contribute to these guidelines, see the [contributing guide](https://github.com/entur/api-guidelines/blob/main/CONTRIBUTING.md).

### 1.4 Requirement levels

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** have these meanings in this document:

- **MUST** and **MUST NOT**: the requirement or prohibition always applies, with no valid reasons to deviate.
- **SHOULD** and **SHOULD NOT**: there can be valid reasons to deviate, but only after the consequences are understood and weighed.
- **MAY**: the item is allowed.

## 2. General guidelines

- A *change* is a modification to a system, such as adding a field, removing an endpoint, fixing a bug or refactoring code.
- An *interface* is the surface a system exposes to others.
- A *consumer* is a person or an AI agent who uses an interface, or is responsible for maintaining a system that uses it, but is not responsible for the interface itself.
- A *consumer-relevant change* is a change that can reasonably be expected to affect consumers. Any other change is an *internal change*.
- A *release* is a set of changes that are made available to consumers together, such as a new SDK version, or API changes that are deployed or switched on with a feature flag.
- A *hosted interface*, such as an API or a web interface, runs in the system that exposes it, so consumers get changes when they are released. An *installed interface*, such as an SDK or a library, runs in consumers' own environment, so they get changes by upgrading.
- A *changelog* communicates how an interface changes to its consumers.
- A changelog *entry* is a distinct and identifiable section of a changelog that is meant to be read on its own. An entry is *published* when it is made available to consumers.

### 2.1 General requirements

For a hosted interface, each consumer-relevant change in a release **MUST** be described in an entry, and a release with no consumer-relevant changes **SHOULD NOT** be mentioned in an entry. An entry **MAY** describe several releases.

For an installed interface, each release **MUST** be described in an entry of its own, which names the release's version and includes every consumer-relevant change in it. If a release has no consumer-relevant changes, its entry **MUST** say so.

An entry:

- **MUST** say, for each change:
  - Which elements of the interface it affects, such as an endpoint, a field, a function or a configuration option.
  - Who it affects, if not every consumer.
  - How it affects them: what they can do, how something behaves now compared with before, or which problem is solved.
- **SHOULD** be concise, and leave out internal changes and anything else that consumers do not need. See [What to include](#24-what-to-include) and [What to leave out](#25-what-to-leave-out).
- **SHOULD** be specific:
  - Without vague or ambiguous wording, as in "some", "might" or "et cetera".
  - With exact values and conditions. Avoid only saying that something changed, as in "improved performance", "upped the timeout", "stricter validation" or "more offers returned".
  - With exact dates and versions. Avoid relative or open-ended timeframes, as in "in 12 months", "for now" or "in a future version".
- **SHOULD** give consumers the context they need:
  - With the content required at the **MUST** level as part of the entry. Anything else **MAY** either be part of the entry or in what it links to.
  - With the terms used in the interface or its published documentation, instead of internal names and abbreviations.
  - Without relying on other entries, for example by referring to "the previous entry" or "as announced earlier".
- **SHOULD** say when or in which version a fixed bug was introduced, if known.
- **SHOULD** use the past tense for how things worked before the changes, and the present tense for how they work after.

### 2.2 Changes that require action

- A change *requires action* if it can reasonably be expected that a consumer has to change something on their end, such as their code, configuration, runtime or workflow, to keep it working.
- The *deadline* of a change that requires action is when, or with which version, things stop working for a consumer who has not taken the required actions.
- A *breaking change* is a change that requires action, with the release as its deadline.
- A *deprecation* is a change that requires action, with a deadline after the release, such as a sunset date or a later version.
- A *backward-compatible change* is a change that does not require action by the time it is released, such as a deprecation.

The terms of service section [API versioning, deprecation, and beta](https://developer.entur.no/terms-of-service#api-versioning-deprecation-and-beta) specifies the full notice period, and when breaking changes are allowed without it. For REST APIs, see also [API Guidelines Appendix I](index.md#i-breaking-changes) for what counts as a breaking change, [API Guidelines Appendix II](index.md#ii-deprecation-rules) for deprecations, and [API Guidelines 2.5 Lifecycle](index.md#25-lifecycle) for the lifecycle stages in which breaking changes are allowed.

For each change that requires action, an entry:

- **MUST** say the required actions and the deadline.
- **MUST** give the reason for giving consumers less than the full notice period.
- **MUST** name any replacements, such as another endpoint that consumers can use instead.
- **MUST** link to the migration guide, if there is one.
- **SHOULD** describe it before the changes that do not require action and those with a later deadline.
- **SHOULD** give consumers enough information to act without having to ask for more.
- **SHOULD** say how consumers can check that they have taken the required actions, for example by testing in a test environment where the change is already available.

For each breaking change, an entry also:

- **MUST** be published without delay.
- **SHOULD** link to the entry for the deprecation, if there is one.

For each deprecation, an entry also:

- **MUST** give the date in [`x-sunset`](index.md#25-lifecycle) as the deadline, for a REST API or endpoint.
- **SHOULD** be published without delay.

### 2.3 Security updates and critical fixes

- A *security update* is a change that fixes a vulnerability or otherwise makes the system more secure.
- A *critical fix* is a change that fixes a problem whose consequences cannot be allowed to continue.

For each consumer-relevant security update or critical fix, an entry:

- **SHOULD** be published without delay.
- **SHOULD** describe it before the other changes that do not require action.

For an installed interface, the entry also:

- **MUST** say which versions are affected by the vulnerability or problem that it fixes. Consumers stay affected until they upgrade.
- **SHOULD** describe the vulnerability or problem, and give the severity and any CVE ID of a vulnerability. The severity tells consumers how urgently they need to upgrade, and a CVE ID lets them match the fix to alerts from their own security tools.
- **SHOULD** say what the vulnerability or problem could have affected, and what consumers need to do about that besides upgrading, such as correcting data or rotating credentials that could have been exposed.

For a hosted interface, the entry also:

- **SHOULD NOT** describe any vulnerabilities. Consumers get the fix without doing anything, so they do not need the details, and such details could help an attacker exploit the same vulnerability elsewhere.
- **SHOULD** say what a vulnerability or problem could have affected before it was fixed, during which period, and what consumers need to do about it, as long as this would not help an attacker. For example, it can say that credentials that could have been exposed have been revoked, and that consumers need new ones.

Some security updates and critical fixes also require action, such as a newly added permission or authentication requirement, or a stricter rate limit or input validation. For those, [2.2 Changes that require action](#22-changes-that-require-action) applies too.

### 2.4 What to include

- [Breaking changes and deprecations](#22-changes-that-require-action).
- Changes to prerequisites, such as a new minimum version of a runtime, of a dependency that consumers have to install, or of a browser.
- Additions, such as new features, endpoints, fields, functions or configuration options.
- Changes to the lifecycle status of an interface or element, such as an API that moves from beta to stable. See [API Guidelines 2.5 Lifecycle](index.md#25-lifecycle).
- When consumer-relevant:
  - [Security updates and critical fixes](#23-security-updates-and-critical-fixes)
  - Bug fixes
  - Changes in behaviour, documented or not, such as the order of items in a list, the conditions under which an error is returned, how long a request can take before it times out, or how long responses are cached (see also [API Guidelines Appendix I](index.md#i-breaking-changes))
  - Changes to the system's own dependencies, build tooling, architecture or infrastructure
  - Changes in the quality characteristics of an interface, such as performance, availability or the package size of an installed interface
- The reason for a change, if it helps consumers understand the change or plan for it, such as why a feature is removed
- Links to published documentation, such as a migration guide or a reference page

### 2.5 What to leave out

- Internal changes, for example:
  - Refactoring, tests and changes to private functions in a library
  - For REST APIs, changes to a specification with `audience` set to `private`, but not to one set to `internal`, which other teams at Entur use (see [API Guidelines 2.4 Entur Metadata](index.md#24-entur-metadata))
  - Changes to the system's own dependencies, build tooling, architecture or infrastructure, including security updates, when they are not consumer-relevant
- Implementation details, such as the programming language, framework, library or database behind a change
- Commit messages - these are written for repository contributors, not for consumers
- References that consumers cannot follow, such as ticket IDs and links to internal systems
- Reasons for a change that do not matter to consumers, such as "due to Spring Boot upgrade failure"

### 2.6 Reviewing and correcting entries

Before it is published, an entry **SHOULD** be reviewed and approved by a person who decides how the interface changes. Until it is published, it **MAY** be changed freely.

Consumers can read an entry in the changelog, or receive a copy of it, for example via email or RSS. An edit to a published entry does not change emails that have already been sent, and does not always change what an RSS reader shows. Even where the edit is visible, consumers who have already read the entry are unlikely to notice it.

A published entry:

- **MUST** be corrected if it can mislead a consumer, in a new entry that links to it. This includes an entry with a wrong or changed deadline, the wrong element, or a missing change or required action.
- **SHOULD** get a note at the top that links to the correction, if it is corrected in a new entry.
- **MAY** be corrected by editing, if its only errors cannot mislead a consumer, such as a typo or a broken link.

A rollback is a release like any other. Its entry **SHOULD** say which changes were reverted, and link to the entries that described them.

## 3. Formatting requirements

🚧🚧🚧

The following requirements describe the format of a changelog published on the [Developer Portal](https://developer.entur.no), and do not apply to changelogs in general. The **MUST**-level requirements are necessary for the Developer Portal to parse and publish the changelog. Each new entry is also sent by email and RSS to subscribers whose filters include it.

🚧🚧🚧
