---
title: Changelog Guidelines
layout: default
nav_order: 2
has_children: false
has_toc: false
---

# Changelog Guidelines

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

These guidelines are for developers, product owners, AI agents and others who write or review changelogs. They apply to changelogs whose consumers are technical, such as developers and AI agents, as long as the changelog is available to an audience other than its authors. Release notes for non-technical consumers, such as the users of a mobile app, are not covered yet.

### 1.2 Purpose

- To standardise rules and best practices for changelogs.
- To contribute to a consistent user experience for readers.
- To help AI agents draft and review changelogs.

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
- A changelog *entry* is a distinct section of a changelog that describes one or more releases.

### 1.5 Requirement levels

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** have these meanings in this document:

- **MUST** and **MUST NOT**: the requirement or prohibition always applies, with no valid reasons to deviate.
- **SHOULD** and **SHOULD NOT**: there can be valid reasons to deviate, but only after the consequences are understood and weighed.
- **MAY**: the item is allowed.

## 2. General requirements

For a hosted interface, a release that has consumer-relevant changes **MUST** be described in an entry, and a release with no consumer-relevant changes **SHOULD NOT** be mentioned in an entry. An entry **MAY** describe several releases.

For an installed interface, each release **MUST** be described in an entry of its own. If a release has no consumer-relevant changes, its entry **MUST** say so.

An entry:

- **MUST** include every consumer-relevant change released since the previous entry. See [What to include](#25-what-to-include).
- **MUST** say, for each change:
  - Which elements of the interface it affects, such as an endpoint, a field, a function or a configuration option.
  - Who it affects, if not every consumer.
  - How it affects them: what they can do, how something behaves now compared with before, or which problem is solved.
- **MUST** reference the version it describes, for an installed interface.
- **SHOULD** be specific:
  - Avoid vague or ambiguous words, such as "improved", "might" or "et cetera".
  - Give exact dates instead of relative ones, such as "for now" or "in 12 months".
- **SHOULD** be concise, and leave out internal changes and anything else that consumers do not need. See [What to leave out](#26-what-to-leave-out).
- **SHOULD** be understandable without relying on other entries, for example without referring to "the previous entry" or "as announced earlier".
- **SHOULD** describe the changes that require action before other changes, with the earliest deadline first.
- **SHOULD** use the terms that consumers can find in the interface or its published documentation, and **SHOULD NOT** use internal names and abbreviations.
- **SHOULD** use the present tense for how things work after the changes, and the past tense for how they worked before.

### 2.1 Changes that require action

A change *requires action* if it can reasonably be expected that a consumer has to change something on their end, such as their code, configuration, runtime or workflow, to keep it working. The *deadline* of a change that requires action is when things stop working for a consumer who has not taken the required actions. A *backward-compatible change* is a change that does not require action by the time it is released.

Consumers need to find out what they have to do and by when, and how much work it is. For each change that requires action, an entry:

- **MUST** say the required actions and the deadline.
- **MUST** name the replacement, if there is one.
- **MUST** link to the migration guide, if there is one. If there are many required actions, consider writing one.
- **SHOULD** give consumers enough information to act without having to ask for more, in the entry itself or in the documentation it links to.
- **SHOULD** say how consumers can verify the changes on their end, for example by testing in a test environment where the change to the interface is already released.

### 2.2 Breaking changes

A *breaking change* is a change that requires action, with the release as its deadline. For REST APIs, see [API Guidelines Appendix I](index.md#i-breaking-changes).

[API Guidelines 2.5 Lifecycle](index.md#25-lifecycle) and the terms of service section [API versioning, deprecation, and beta](https://developer.entur.no/terms-of-service#api-versioning-deprecation-and-beta) specify when breaking changes are allowed without the full notice period.

In addition to the requirements in [2.1 Changes that require action](#21-changes-that-require-action), for each breaking change, an entry:

- **MUST** be published without delay.
- **MUST** say why the change could not wait for the full notice period, if it is made under an exception relating to security, regulatory compliance or external parties.
- **SHOULD** link to the entry for the deprecation, if there is one.

### 2.3 Deprecations

A *deprecation* is a change that requires action, with a deadline after the release, such as a sunset date or a later version. A deprecation is backward compatible.

In addition to the requirements in [2.1 Changes that require action](#21-changes-that-require-action), for each deprecation, an entry:

- **MUST** give the deadline as the date in `x-sunset` for a REST API or endpoint, and otherwise as the version that removes the element, for example the next major version.
- **SHOULD** be published without delay.

### 2.4 Security updates

For each consumer-relevant security update, an entry:

- **MUST** say which versions are affected by a fixed vulnerability, for an installed interface. Consumers are not safe until they upgrade.
- **SHOULD** be published without delay, for an installed interface.
- **SHOULD** describe the vulnerability, for an installed interface. Including its severity tells consumers how urgently they need to upgrade, and any CVE ID lets them match the fix to alerts from their own security tools.
- **SHOULD NOT** describe any vulnerabilities, for a hosted interface. Consumers get the fix without doing anything, so they do not need the details, and such details could help someone exploit the same vulnerability elsewhere.

Some security updates also require action, such as a newly added permission or authentication requirement, or a stricter rate limit. For those, [2.1 Changes that require action](#21-changes-that-require-action) applies too, and [2.2 Breaking changes](#22-breaking-changes) if the deadline is the release.

### 2.5 What to include

- [Breaking changes](#22-breaking-changes) and [deprecations](#23-deprecations).
- Changes in behaviour, documented or not, such as the order of items in a list, the conditions under which an error is returned, how long a request can take before it times out, or how long responses are cached (see also [API Guidelines Appendix I](index.md#i-breaking-changes)).
- Changes to prerequisites, such as a new minimum version of a runtime, of a dependency that consumers have to install, or of a browser.
- Additions, such as new features, endpoints, fields, functions or configuration options. The entry **SHOULD** say what consumers can use them for, and for optional ones, what happens if consumers do not use them.
- Consumer-relevant bug fixes. The entry **SHOULD** say what triggered the bug and, if known, since when it was there, so consumers can tell whether it affected them.
- Consumer-relevant [security updates](#24-security-updates).
- Consumer-relevant changes to the system's own dependencies, build tooling, architecture or infrastructure.
- Consumer-relevant changes in the quality characteristics of an interface, such as performance, availability or the package size of an installed interface.
- The reason for a change, if it helps consumers understand the change or plan for it, such as why a feature is removed.
- Links to published documentation, such as a migration guide or a reference page, for details that the entry does not need to repeat.

### 2.6 What to leave out

- Internal changes, for example:
  - Refactoring, tests and changes to private functions in a library. For REST APIs, a change to a specification with `audience` set to `private` (see [API Guidelines 2.4 Entur Metadata](index.md#24-entur-metadata)).
  - Changes to the system's own dependencies, build tooling, architecture or infrastructure, including security updates, when they are not consumer-relevant.
- Implementation details, such as the programming language, framework, library or database behind a change.
- Commit messages. These are written for repository contributors, not for consumers.
- Reasons for a change that do not matter to consumers, such as "due to Spring Boot upgrade failure".

### 2.7 Writing, reviewing and correcting entries

An entry **SHOULD** be written together with the changes it describes, and be reviewed and approved with them by a person who decides how the interface changes. Until it is published, it **MAY** be changed freely.

Consumers can read an entry in the changelog, or receive a copy of it, for example via email or RSS. An edit to a published entry does not change emails that have already been sent, and does not always change what an RSS reader shows. Even where the edit is visible, consumers who have already read the entry are unlikely to notice it.

A published entry:

- **MUST** be corrected if it can mislead a consumer, in a new entry that links to it. This includes an entry with a wrong or changed deadline, the wrong element, or a missing change or required action.
- **MAY** be corrected by editing, if its only errors cannot mislead a consumer, such as a typo or a broken link.

A rollback is a release like any other. Its entry **SHOULD** say which changes were reverted, and link to the entries that described them.

## 3. Formatting requirements

🚧🚧🚧

The following requirements describe the format of a changelog published on the [Developer Portal](https://developer.entur.no), and do not apply to changelogs in general. The **MUST** requirements are necessary for the Developer Portal to parse and publish the changelog. Each new entry is also sent by email and RSS to subscribers whose filters include it.

🚧🚧🚧
