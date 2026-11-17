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

These guidelines are for developers, product owners, AI agents and others who write or review technical changelogs. They do not apply to changelogs that only their own writers read, or to release notes for non-technical readers.

### 1.2 Purpose

- To standardise rules and best practices for changelogs
- To contribute to a consistent user experience for readers
- To help AI agents draft and review changelogs

### 1.3 Contributing

For details on how to contribute to these guidelines, see the [contributing guide](https://github.com/entur/api-guidelines/blob/main/CONTRIBUTING.md).

### 1.4 Definitions

- A *change* is a modification to a system, such as adding a field, removing an endpoint, fixing a bug or refactoring code.
- An *interface* is the surface a system exposes to others.
- A *consumer* is a person or an AI agent who depends on an interface but does not decide how it changes.
- A *consumer-relevant change* is a change that can reasonably be expected to affect consumers. Any other change is an *internal change*.
- A *release* is a set of changes that are made available to consumers together, such as a new SDK version, or API changes that are deployed or switched on with a feature flag.
- A *hosted interface*, such as an API or a web interface, runs in the system that exposes it, so consumers get changes when they are released. An *installed interface*, such as an SDK or a library, runs in consumers' own environment, so they get changes by upgrading.
- A *changelog* communicates how an interface changes to its consumers.
- A changelog *entry* is a distinct and identifiable section of a changelog, which is published as a whole. An entry is *published* when it is made available to consumers.

### 1.5 Requirement levels

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** have these meanings in this document:

- **MUST** and **MUST NOT**: the requirement or prohibition always applies, with no valid reasons to deviate.
- **SHOULD** and **SHOULD NOT**: there can be valid reasons to deviate, but only after the consequences are understood and weighed.
- **MAY**: the item is allowed.

## 2. General requirements

For a hosted interface, a release that has consumer-relevant changes **MUST** be described in an entry, and a release with no consumer-relevant changes **SHOULD NOT** be mentioned in an entry. An entry **MAY** describe several releases.

For an installed interface, each release **MUST** be described in an entry of its own, which names the release's version. If a release has no consumer-relevant changes, its entry **MUST** say so.

An entry:

- **MUST** include every consumer-relevant change in the releases it describes. See [What to include](#23-what-to-include).
- **MUST** say, for each change:
  - Which elements of the interface it affects, such as an endpoint, a field, a function or a configuration option.
  - Who it affects, if not every consumer.
  - How it affects them: what they can do, how something behaves now compared with before, or which problem is solved.
- **SHOULD** be concise, and leave out internal changes and anything else that consumers do not need. See [What to leave out](#24-what-to-leave-out).
- **SHOULD** be specific:
  - Without vague or ambiguous wording, such as "some", "might", "better", "improved" or "et cetera".
  - With exact values and conditions, instead of only saying that something changed, as in "upped the timeout", "stricter validation" or "more offers returned".
  - With exact dates and versions instead of relative or open-ended timeframes, such as "in 12 months", "for now" or "in a future version".
- **SHOULD** give consumers the context they need:
  - With what the **MUST**-level requirements call for contained in the entry itself. Anything else **MAY** either be in the entry or in what it links to.
  - With the terms used in the interface or its published documentation, instead of internal names and abbreviations.
  - Without relying on other entries, for example by referring to "the previous entry" or "as announced earlier".
- **SHOULD** say when or in which version the behaviour that a fix corrects started, if known.
- **SHOULD** use the present tense for how things work after the changes, and the past tense for how they worked before.

### 2.1 Changes that require action

A change *requires action* if it can reasonably be expected that a consumer has to change something on their end, such as their code, configuration, runtime or workflow, to keep it working. The *deadline* of a change that requires action is when, or with which version, things stop working for a consumer who has not taken the required actions. Depending on its deadline, a change that requires action is either a [breaking change](#211-breaking-changes) or a [deprecation](#212-deprecations). A *backward-compatible change* is a change that does not require action by the time it is released.

An entry **SHOULD** describe the changes that require action before other changes, with the earliest deadline first.

Consumers need to find out what they have to do and by when. For each change that requires action, an entry:

- **MUST** say the required actions and the deadline.
- **MUST** name any replacements, such as another endpoint that consumers can use instead.
- **MUST** link to the migration guide, if there is one.
- **SHOULD** give consumers enough information to act without having to ask for more.
- **SHOULD** say how consumers can check that they have taken the required actions, for example by testing in a test environment where the change is already available.
- **MAY** summarise the required actions and the replacements, and leave the full lists to the migration guide, if there is one. For example, it can name the new version of an API, and leave the replacement of each field to the guide. If there are many required actions, consider writing a migration guide.

#### 2.1.1 Breaking changes

A *breaking change* is a change that requires action, with the release as its deadline. For REST APIs, see [API Guidelines Appendix I](index.md#i-breaking-changes).

[API Guidelines 2.5 Lifecycle](index.md#25-lifecycle) and the terms of service section [API versioning, deprecation, and beta](https://developer.entur.no/terms-of-service#api-versioning-deprecation-and-beta) specify when breaking changes are allowed without the full notice period.

In addition to the requirements in [2.1 Changes that require action](#21-changes-that-require-action), for each breaking change, an entry:

- **MUST** be published without delay.
- **MUST** say why the change could not wait for the full notice period, if it is made under an exception relating to security, regulatory compliance or external parties.
- **SHOULD** link to the entry for the deprecation, if there is one.

#### 2.1.2 Deprecations

A *deprecation* is a change that requires action, with a deadline after the release, such as a sunset date or a later version. A deprecation is backward compatible.

In addition to the requirements in [2.1 Changes that require action](#21-changes-that-require-action), for each deprecation, an entry:

- **MUST** give the date in [`x-sunset`](index.md#25-lifecycle) as the deadline, for a REST API or endpoint.
- **SHOULD** be published without delay.

### 2.2 Security updates

A *security update* is a change that fixes a vulnerability or otherwise makes the system more secure.

For each consumer-relevant security update to an installed interface, an entry:

- **MUST** say which versions are affected by a fixed vulnerability. Consumers are not safe until they upgrade.
- **SHOULD** be published without delay.
- **SHOULD** describe the security update before the other changes that do not require action.
- **SHOULD** describe the vulnerability. Including its severity tells consumers how urgently they need to upgrade, and any CVE ID lets them match the fix to alerts from their own security tools.

For each consumer-relevant security update to a hosted interface, an entry **SHOULD NOT** describe any vulnerabilities. Consumers get the fix without doing anything, so they do not need the details, and such details could help someone exploit the same vulnerability elsewhere.

Some security updates also require action, such as a newly added permission or authentication requirement, or a stricter rate limit. For those, [2.1 Changes that require action](#21-changes-that-require-action) applies too.

### 2.3 What to include

- [Breaking changes](#211-breaking-changes) and [deprecations](#212-deprecations).
- Changes to prerequisites, such as a new minimum version of a runtime, of a dependency that consumers have to install, or of a browser.
- Additions, such as new features, endpoints, fields, functions or configuration options.
- Changes to the lifecycle status of an interface or element, such as an API that moves from beta to stable. See [API Guidelines 2.5 Lifecycle](index.md#25-lifecycle).
- When consumer-relevant:
  - [Security updates](#22-security-updates)
  - Bug fixes
  - Changes in behaviour, documented or not, such as the order of items in a list, the conditions under which an error is returned, how long a request can take before it times out, or how long responses are cached (see also [API Guidelines Appendix I](index.md#i-breaking-changes))
  - Changes to the system's own dependencies, build tooling, architecture or infrastructure
  - Changes in the quality characteristics of an interface, such as performance, availability or the package size of an installed interface
- The reason for a change, if it helps consumers understand the change or plan for it, such as why a feature is removed.
- Links to published documentation, such as a migration guide or a reference page.

### 2.4 What to leave out

- Internal changes, for example:
  - Refactoring, tests and changes to private functions in a library
  - For REST APIs, changes to a specification with `audience` set to `private`, but not to one set to `internal`, which other teams at Entur use (see [API Guidelines 2.4 Entur Metadata](index.md#24-entur-metadata))
  - Changes to the system's own dependencies, build tooling, architecture or infrastructure, including security updates, when they are not consumer-relevant
- Implementation details, such as the programming language, framework, library or database behind a change
- Commit messages - these are written for repository contributors, not for consumers
- References that consumers cannot follow, such as ticket IDs and links to internal systems
- Reasons for a change that do not matter to consumers, such as "due to Spring Boot upgrade failure"

### 2.5 Reviewing and correcting entries

Before it is published, an entry **SHOULD** be reviewed and approved by a person who decides how the interface changes. Until it is published, it **MAY** be changed freely.

Consumers can read an entry in the changelog, or receive a copy of it, for example via email or RSS. An edit to a published entry does not change emails that have already been sent, and does not always change what an RSS reader shows. Even where the edit is visible, consumers who have already read the entry are unlikely to notice it.

A published entry:

- **MUST** be corrected if it can mislead a consumer, in a new entry that links to it. This includes an entry with a wrong or changed deadline, the wrong element, or a missing change or required action.
- **SHOULD** get a note at the top that links to the correction, if it is corrected in a new entry.
- **MAY** be corrected by editing, if its only errors cannot mislead a consumer, such as a typo or a broken link.

A rollback is a release like any other. Its entry **SHOULD** say which changes were reverted, and link to the entries that described them.

## 3. Formatting requirements

🚧🚧🚧

The following requirements describe the format of a changelog published on the [Developer Portal](https://developer.entur.no), and do not apply to changelogs in general. The **MUST** requirements are necessary for the Developer Portal to parse and publish the changelog. Each new entry is also sent by email and RSS to subscribers whose filters include it.

🚧🚧🚧
