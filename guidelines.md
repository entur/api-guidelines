# API Guidelines

> **Request for comment**


## 1. Introduction
Welcome to this API guide, designed to ensure a consistent and robust approach to developing [RESTful](https://en.wikipedia.org/wiki/REST) APIs. REST (Representational State Transfer) is an architectural style that uses standard HTTP methods to create scalable, lightweight, and maintainable services.


### 1.1 Purpose of the Entur API guidelines
- To establish common guidelines and best practices for API design
- To simplify integration between different systems and applications
- To contribute to a secure, efficient and user-friendly implementation of APIs


### 1.2 Intended audience
This guide is for developers, architects, and technical designers who work on the design, implementation, and maintenance of APIs. By following these guidelines, we ensure APIs are easy to understand, consistent in structure, and simple to integrate with other systems.


### 1.3 Requirement Levels
Throughout this document, these requirement levels are used:
- **MUST**: This is an absolute requirement
- **SHOULD**: There may be valid reasons to ignore this requirement, but implications must be understood and carefully weighed
- **MAY**: This is optional


### 1.4 Linter Coverage
Throughout this document, rules are marked with the following indicators:
- :white_check_mark: Automatically enforced by [linter](README.md)
- :ballot_box_with_check: Partially checked by [linter](README.md)
- :eyes: Requires manual review


## 2. Core Principles
<!-- Foundation level concepts all APIs should follow -->


### 2.1 General Design Principles
- Consistency - Make sure the API is easy to understand and predictable
- :white_check_mark: HTTP Methods - API endpoints **MUST** use standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
- :white_check_mark: Data Format - API endpoints **MUST** support the JSON data format
- :white_check_mark: Documentation - All functionality **SHOULD** be documented with examples and descriptions
- :white_check_mark: You **MUST** use the OpenAPI V3 spec to define APIs
- :white_check_mark: Encryption: All communication **MUST** be over HTTPS
- :white_check_mark: No localhost (or 127.0.0.1) host names.


### 2.2 Development Approach
- :eyes: We **encourage** to follow a Contract-First workflow:
  - Create the API specification before implementing the API
  - The specification is the primary reference for both development and documentation
  - Update the specification throughout development to reflect changes
- :eyes: [Lint your API spec](README.md)
- :eyes: Differentiate APIs based on the target audience:
  - Internal APIs - May have extended functionality and less stringent requirements, but **MUST** still be documented and tested
  - External APIs - **MUST** be carefully documented with a focus on stability, security, and consistency


### 2.3 Authentication and Authorization
*TODO*


## 3. Naming & Structure Conventions
<!-- How to organize and label resources -->


### 3.1 Resource Naming
- :eyes: You **SHOULD** use plural Nouns - For example: `/customers`, `/benefits` and `/offers`
  - Exception: Singleton resources that represent a unique entity **MAY** use singular form, such as `/user/profile`, `/me`
- :eyes: Hierarchical Structure - For related resources you **SHOULD** use hierarchical URL structure. For example: `/orders/{orderId}/fees`
- :eyes: No Actions in URL - Actions (such as create, delete) **SHOULD** be handled via the HTTP method, not in the URL itself
- :white_check_mark: URL in kebab-case - URL for APIs **MUST** be in kebab-case. For example `/realtime-deviations/v1/subscription`
- :white_check_mark: Field Names in camelCase - For request and response body field names and query parameters, camelCase **MUST** be used
- :eyes: Consistent Terminology - Similar concepts across different APIs **SHOULD** use consistent naming. For example, don't mix `/users` and `/people` or `/proposals` and `/offers` when referring to the same concept across different APIs.
- :white_check_mark: Server URL **MUST** be in lowercase
- :white_check_mark: Paths **SHOULD NOT** contain "api" in the name


### 3.2 Versioning
- :eyes: URL Based Versioning - You **MUST** include the version number in the URL
- :eyes: Best Practices on Version Info - You **SHOULD** place the version number immediately after the domain, and before the resource path itself
  - Example: `https://api.entur.io/sales/v1/orders?distributionChannelId=1`


### 3.3 Backward Compatibility
- :eyes: You **MUST** not remove or modify existing fields or endpoints
- :eyes: You **MUST** introduce new versions for changes that break previous contracts
- :eyes: You **MUST** clearly document which features are deprecated and provide guidance for migration


## 4. Communication Standards
<!-- HTTP standards and protocols -->


### 4.1 HTTP Status Codes

- :white_check_mark: Request body is only allowed for PUT, POST and PATCH

| Code | Description           | GET | POST | PUT | PATCH | DELETE |
|------|-----------------------|-----|------|-----|-------|--------|
| 200  | OK                    |  :white_check_mark:  |      | :white_check_mark:    | :white_check_mark:      |:white_check_mark: |
| 201  | Created               |     |   :white_check_mark:   |     |       |        |
| 202  | Accepted              |     |  :white_check_mark:    |     |       |        |
| 204  | No Content            | :white_check_mark:    |      |  :white_check_mark:    |  :white_check_mark:      |  :white_check_mark:       |
| 303  | See Other             |     |   :white_check_mark:    |     |       |        |
| 400  | Bad Request           |  :white_check_mark:   |   :white_check_mark:    |   :white_check_mark:   |:white_check_mark:        |:white_check_mark:        |
| 401  | Unauthorized          |  :white_check_mark:    |:white_check_mark:       |:white_check_mark:      |:white_check_mark:        |:white_check_mark:         |:white_check_mark:
| 403  | Forbidden             |  :white_check_mark:    |:white_check_mark:       |:white_check_mark:      |:white_check_mark:        |:white_check_mark:         |:white_check_mark:
| 404  | Not Found             |  :white_check_mark:    |:white_check_mark:       |:white_check_mark:      |:white_check_mark:        |:white_check_mark:         |:white_check_mark:
| 409  | Conflict              |     |   :white_check_mark:    |   :white_check_mark:   |:white_check_mark:        |:white_check_mark:         |
| 500  | Internal Server Error |  :white_check_mark:    |:white_check_mark:       |:white_check_mark:      |:white_check_mark:        |:white_check_mark:         |:white_check_mark:
| 503  | Service Unavailable   |  :white_check_mark:    |:white_check_mark:       |:white_check_mark:      |:white_check_mark:        |:white_check_mark:         |:white_check_mark:


### 4.2 Error Handling
When an error occurs, the IETF standard for Problem Details for HTTP APIs [(RFC 9457)](https://www.rfc-editor.org/rfc/rfc9457.html) **SHOULD** be followed, with few additional guidelines:
- :white_check_mark: Error responses **MUST** use media type `application/problem+json`
- :white_check_mark: The following fields MUST be included: `title`, `status`.
- :eyes: The `detail` field **SHOULD** be included when it provides additional useful information.
- :eyes: The `type` field is **OPTIONAL**. If used, it should ideally be a meaningful URI, but **MAY** fallback to `about:blank`.
- :eyes: Optional fields: `instance`, and any custom fields (extensions).






Example:
> HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en
```json
{
  "type": "about:blank",
  "title": "Access forbidden",
  "status": 403,
  "detail": "You do not have permission to access this resource..",
  "instance": "/something/something",
  "balance": 30,                        //Custom field
  "recommended-action": "Something."    //Custom field
}
```


## 5. Data Formatting Standards
<!-- Standardizing data formats -->


### 5.1 Language & Spelling
- :eyes: You **MAY** allow clients to specify preferred language via Accept-Language header or query parameter
- :eyes: British English spelling as defined in the Oxford English Dictionary **SHOULD** be used for consistency

Example:
>GET /api/v1/info?lang=no
Accept-Language: nob


### 5.2 Date & Time
- :eyes: You **SHOULD** use the ISO 8601 standard for all date and timestamps

Example:
>"lastUpdated": "2025-02-13T15:30:00Z"



### 5.3 Currency Representation
- :eyes: Prices should be specified as floating-point numbers, represented as strings
- :eyes: Request: Max 18 digits total; max 5 decimals (follows ISO 20022)
- :eyes: Response: Always serialized with the standard number of decimals. For NOK, this means 2, since øre is the smallest unit.

Example:
```
{
    "amount": "99.00"
    "currency": "NOK"
}
```


### 5.4 Character Encoding
- :white_check_mark: You **MUST** encode all text in UTF-8
- :eyes: Set the Content-Type header to `application/json; charset=utf-8`
  - Tip: test the api with international character (e.g. æ, ø, å)


### 5.5 HTTP Headers
- :ballot_box_with_check: HTTP headers **MUST** use Hyphenated-Pascal-Case format (e.g., `Content-Type`, `Accept-Language`)
- :white_check_mark: HTTP headers **SHOULD NOT** include the 'X-' prefix, following RFC 6648

## 6. Advanced Design Patterns
<!-- More complex design patterns -->


### 6.1 Filtering, Sorting & Pagination
- :eyes: You **MAY** allow filtering, sorting, and pagination to retrieve specific data

Example:
> GET /api/v1/bus-stops?city=Oslo&sort=name&page=2&limit=20


### 6.2 Partial Responses
- :eyes: You **MAY** let clients choose which fields to include to reduce data transfer


Example:
> GET /api/v1/bus-stops?fields=id,name,location

### 6.3 Batch Operations
- :eyes: When multiple operations need to be handled in a single call, the API **SHOULD** support batch operations

Example:
```json
POST /api/v1/batch
{
 "operations": [
   { "method": "GET", "path": "/v1/resource/1" },
   { "method": "DELETE", "path": "/v1/resource/2" }
 ]
}
```


### 6.4 Caching & Resource Expiration
- :eyes: You **MAY** use HTTP headers such as Cache-Control, ETag, and Last-Modified

Example:
> HTTP/1.1 200 OK
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Fri, 13 Feb 2025 15:30:00 UTC


### 6.5 Import & Export Formats
- :eyes: You **MUST** support JSON, but **MAY** use XML or CSV where appropriate
- :white_check_mark: Use the HTTP Accept header to specify desired response format

Example:

```
GET /api/v1/data
Accept: application/json
```


### 6.6 Validation
- :eyes: You **SHOULD** validate all incoming data and return detailed error messages with appropriate HTTP status codes
- :eyes: Error messages **SHOULD** be specific enough to guide the client toward fixing the issue
- :eyes: Validation errors **SHOULD** return 400 Bad Request status code

Example:
> HTTP/1.1 400 Bad Request
> Content-Type: application/problem+json
> Content-Language: en

```json
{
 "type": "https://api.entur.io/v1/orders",
 "title": "Invalid input",
 "status": 400,
 "detail": "Field must be valid email.",
 "errors": [
   {
     "field": "email",
     "message": "Field must be valid email.",
     "code": "INVALID_FORMAT"
   }
 ]
}
```

### 6.7 HATEOAS
- :eyes: You **MAY** include links to related resources in responses to enable easy API navigation

Example:
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

## 7. Alternative Approaches


### 7.1 When to Consider Non-RESTful Designs
There may be situations where a pure REST architecture is not the best solution. In such cases, consider alternative design patterns. The choice should be justified based on performance requirements, complexity, and consistency with other systems, as well as overall guidelines in the architect's intent.


#### Alternative Design Patterns:
- **GraphQL**: For flexible queries where the client can specify exactly what data is needed
- **Event-driven architecture**: For asynchronous or event-based scenarios
- **WebSocket**: For real-time bidirectional communication
- **gRPC**: For high-performance, strongly-typed services


## FAQ

*Must existing APIs conform the guidelines?*
- Non-breaking changes (like adding example values) **SHOULD** be updated to be compliant with the guidelines.
- Breaking changes **MAY** be added in a new version of the API.
- New APIs **MUST** follow the guidelines.
