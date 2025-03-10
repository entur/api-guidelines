# API Guidelines

> <span style="background-color:yellow">Request for comment</span>

## Introduction
Welcome to this API guide, designed to ensure a consistent and robust approach to developing [RESTful](https://en.wikipedia.org/wiki/REST) APIs. REST (Representational State Transfer) is an architectural style that uses standard HTTP methods to create scalable, lightweight, and maintainable services.

## Requirement Levels
Throughout this document, these requirement levels are used:
- **MUST**: This is an absolute requirement.
- **SHOULD**: There may be valid reasons to ignore this requirement, but implications must be understood and carefully weighed.
- **MAY**: This is optional.

## Linter Coverage
Throughout this document, rules are marked with the following indicators:
- :heavy_check_mark:  Automatically enforced by [linter](README.md)
- :white_check_mark: Partially checked by [linter](README.md)
- :eyes: Requires manual intervention

### Purpose of the Entur API guidelines
- To establish common guidelines and best practices for API design.
- To simplify integration between different systems and applications.
- To contribute to a secure, efficient and user-friendly implementation of APIs.

### Intended audience
This guide is intended for developers, architects, and technical designers who work on the design, implementation, and maintenance of APIs. By following these guidelines, we ensure that APIs are easy to understand, consistent in their structure, and easily integrated with other systems.

## Basic Principles

### General Principles
- Consistency - Make sure the API is easy to understand and predictable
- :heavy_check_mark: HTTP Methods - API endpoints **MUST** use standard HTTP methods (GET, POST, PUT, PATCH, DELETE) to represent operations.
- :heavy_check_mark: Data Format - API endpoints **MUST** support the JSON data format.
- :heavy_check_mark: Documentation - All functionality **SHOULD** be documented with examples and descriptions.

### API Design Principles
- :heavy_check_mark: You **MUST** use the OpenAPI V3 spec to define APIs
- Follow a Contract-First Workflow:
  - Create the API specification before implementing / coding the API.
  - The specification is the primary reference for both development and documentation.
  - Iterative Process - Continuously update the specification throughout the development cycle to reflect changes.
- [Lint your API spec](README.md)
- Differentiate APIs based on the target audience
  - Internal APIs - May have extended functionality and less stringent requirements, but **MUST** still be documented and tested.
  - External APIs - **MUST** be carefully documented with a focus on stability, security, and consistency, so that third-party developers can integrate with minimal effort.
- Security
  - :heavy_check_mark: Encryption: All communication should be over HTTPS.

### Authentication and authorization
*TODO*

## Standards and Conventions

### Resource and Versioning Strategy

#### Resource Naming

- :eyes: You **SHOULD** use plural Nouns - For example: `/customers`, `/benefits` and `/offers`
- :eyes: Hierarchical Structure - For related resources you **SHOULD** use hierarchical URL structure. For example: `/orders/{orderId}/fees`
- :eyes: No Actions in URL - Actions (such as create, delete) **SHOULD** be handled via the HTTP method, not in the URL itself.
- :heavy_check_mark: URL in kebab-case - URL for APIs **MUST** be in kebab-case. For example `/realtime-deviations/v1/subscription`
- :heavy_check_mark: Field Names in camelCase - For request and response body field names and query parameters, camelCase **MUST** be used.

#### Versioning
- :eyes: URL Based Versioning - You **MUST** include the version number in the URL.
- :eyes: Best Practices on Version Info - You **SHOULD** place the version number immediately after the domain, and before the resource path itself.

Example version: `https://api.entur.io/sales/v1/orders?distributionChannelId=1`


#### Backward Compatibility

To avoid breaking existing integrations:

- You **MUST** not remove or modify existing fields/endpoints - Add new features without changing the existing structure.
- You **MUST** introduce new versions for changes that break previous contracts.
- You **MUST** clearly document which features are deprecated and provide guidance for migration.

### Communication Standards

#### Allowed HTTP Status Codes per HTTP method

| Code | Description           | GET | POST | PUT | PATCH | DELETE |
|------|-----------------------|-----|------|-----|-------|--------|
| 200  | OK                    |  :heavy_check_mark:  |      | :heavy_check_mark:    | :heavy_check_mark:      |:heavy_check_mark: |
| 201  | Created               |     |   :heavy_check_mark:   |     |       |        |
| 202  | Accepted              |     |  :heavy_check_mark:    |     |       |        |
| 204  | No Content            | :heavy_check_mark:    |      |  :heavy_check_mark:    |  :heavy_check_mark:      |  :heavy_check_mark:       |
| 303  | See Other             |     |   :heavy_check_mark:    |     |       |        |
| 400  | Bad Request           |  :heavy_check_mark:   |   :heavy_check_mark:    |   :heavy_check_mark:   |:heavy_check_mark:        |:heavy_check_mark:        |
| 401  | Unauthorized          |  :heavy_check_mark:    |:heavy_check_mark:       |:heavy_check_mark:      |:heavy_check_mark:        |:heavy_check_mark:         |:heavy_check_mark:
| 403  | Forbidden             |  :heavy_check_mark:    |:heavy_check_mark:       |:heavy_check_mark:      |:heavy_check_mark:        |:heavy_check_mark:         |:heavy_check_mark:
| 404  | Not Found             |  :heavy_check_mark:    |:heavy_check_mark:       |:heavy_check_mark:      |:heavy_check_mark:        |:heavy_check_mark:         |:heavy_check_mark:
| 500  | Internal Server Error |  :heavy_check_mark:    |:heavy_check_mark:       |:heavy_check_mark:      |:heavy_check_mark:        |:heavy_check_mark:         |:heavy_check_mark:
| 503  | Service Unavailable   |  :heavy_check_mark:    |:heavy_check_mark:       |:heavy_check_mark:      |:heavy_check_mark:        |:heavy_check_mark:         |:heavy_check_mark:


#### Error responses

When an error occurs, the IETF standard for Problem Details for HTTP APIs [(RFC 9457)](https://www.rfc-editor.org/rfc/rfc9457.html) **MUST** be followed, which means that:

:heavy_check_mark: The error response **MUST** be returned with the media type `application/problem+json`.

:heavy_check_mark: Also, the response body **MUST** include the following fields:
- type (string, URI)
- title (string)
- status (integer)
- detail (string)

:eyes: The response body **MAY** also include the following fields:
- instance (string, URI)
- “extensions” (any number of custom fields)

Example:
> HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en
```json
{
  "type": "https://api.entur.io/v1/orders",
  "title": "Something",
  "status": 403,
  "detail": "Something.",
  "instance": "/something/something",
  "balance": 30,                        //Custom field
  "recommended-action": "Something."    //Custom field
}
```

## Advanced Design Patterns and Technical Guidelines

### Design Patterns
- :eyes: RESTful API: Stick to simple, resource-oriented URIs.
- :heavy_check_mark: RESTful API: You **MUST** use standard HTTP methods (GET, POST, PUT, PATCH, and DELETE).
- :eyes: HATEOAS: Include links to related resources in responses so that the client can easily navigate the API.

HATEOAS Example:
```json
{
  "id": 123,
  "name": "Sentralstasjonen",
  "links": [
    { "rel": "self", "href": "/api/v1/bus-stops/123" },
    { "rel": "schedules", "href": "/api/v1/bus-stops/123/schedules" }
  ]
}
```

### Language
You **MAY** allow clients to specify preferred language via Accept-Language header or as query parameter.
Example:
>GET /api/v1/info?lang=no
Accept-Language: nob

### Spelling Conventions
We adhere to British English spelling as defined in the Oxford English Dictionary (OED). This standardization ensures consistency across all API documentation, error messages, and responses.


### Date
:eyes: You **SHOULD** use the ISO 8601 standard for all date and timestamps.
Example:
```json
{
  "lastUpdated": "2025-02-13T15:30:00Z"
}
```

### Currency Representation

Prices should be specified as floating-point numbers, represented by a string in standard currency units. For NOK, this means kroner.
* Request: Max 18 digits total; max 5 decimals (follows ISO 20022)
* Response: Always serialized with the standard number of decimals. For NOK, this means 2, since øre is the smallest unit.
```
{
    "amount": "99.00"
    "currency": "NOK"
}
```

### Unicode
:heavy_check_mark: You **MUST** encode all text (in request and response) in UTF-8.
Tips:
- :eyes: Set the Content-Type header to application/json; charset=utf-8
- Test the API with international characters (e.g. æ, ø, å)


### Import and export
You **MUST** support JSON, but **MAY** use XML or CSV where appropriate.
Example:
> GET /api/v1/data?format=csv

### Validation
You **SHOULD** Validate all incoming data and return detailed error messages with appropriate HTTP status codes (e.g. 400 Bad Request).
Example:
> HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
Content-Language: en

```json
{
  "type": "https://api.entur.io/v1/orders",
  "title": "Invalid input",
  "status": 400,
  "detail": "Feltet 'email' må være en gyldig e-postadresse."
}
```

### Partial response
You **MAY** let clients choose which fields they want to include in the response to reduce the amount of data. Filter the fields on the server side based on the query parameter.
> GET /api/v1/bus-stops?city=Oslo&sort=name&page=2&limit=20

### Filtering

You **MAY** allow filtering, sorting, and pagination so that the client can retrieve exactly the data needed.

> GET /api/v1/bus-stops?city=Oslo&sort=name&page=2&limit=20

### Pagination
**TODO**

### Resource expiration
You **MAY** use HTTP headers such as Cache-Control, ETag, and Last-Modified to streamline caching.

Example:
> HTTP/1.1 200 OK
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Fri, 13 Feb 2025 15:30:00 GMT


### Batch requests

When multiple operations are to be handled in a single call, the API **SHOULD** support batch operations. This can be implemented using:

- Multi-part Requests: A single HTTP request that contains multiple operations.
- Dedicated Batch Endpoint: An endpoint that takes a list of operations and returns a corresponding list of results.

Dedicated Batch Endpoint example:
```json
{
  "operations": [
    { "method": "GET", "path": "/v1/resource/1" },
    { "method": "DELETE", "path": "/v1/resource/2" }
  ]
}
```

## Alternative Approaches

### What to do when REST doesn't fit?
There may be situations where a pure REST architecture is not the best solution. In such cases, consider alternative design patterns. The choice should be justified based on performance requirements, complexity, and consistency with other systems, as well as overall guidelines in the architect's intent.

Examples of other design patterns:
- GraphQL: For flexible queries where the client can specify exactly what data is needed.
- Event-driven architecture: For asynchronous or event-based scenarios.
- WebSocket: TBA
- gRPC: TBA

## Project organization
Separate specifications from implementation code. OpenAPI files **SHOULD** be in **TBD**

## FAQ
*Must existing APIs conform the guidelines?*
Non-breaking changes (like adding example values) **SHOULD** be updated to be compliant with the guidelines.
Breaking changes **MAY** be added in a new version of the API.
New APIs **MUST** follow the guidelines.
