# Pagination and Sorting

## Pagination

When implementing pagination, you **MUST** use either Cursor Pagination (preferred) or Offset Pagination, on the formats detailed below.  

### Offset Pagination

This strategy is based on these query parameters:

| Parameter  | Type    | Description                                                        |
|------------|---------|--------------------------------------------------------------------|
| `page`     | integer | Zero-based index of the page to retrieve. **MUST** be named `page` |
| `pageSize` | integer | Number of items per page. **MUST** be named `pageSize`                 |

**Example request:**

```http
GET /api/v1/bus-stops?city=Oslo&page=1&pageSize=20
```

When handling the request, the service skips `page * pageSize` items and returns the next `pageSize` items.
In the example above, items 21–40 are returned (page `1` * pageSize `20` = skip the first 20 items).

#### Response format

The response format will vary between APIs, but a typical response at least include the items along with the total number of items that can be paginated:

The response **MUST** contain the following fields:

| Parameter | Type    | Description                                                                      |
|-----------|---------|----------------------------------------------------------------------------------|
| `items`  | array   | **MUST** be named `items`. |
| `totalItems`    | integer | The total number of items across all pages. **MUST** be named `totalItems`       |
| `pageSize`    | integer | The requested `pageSize`, or max page size if given `pageSize` was over max. |

The response **MAY** contain the following fields:

| Parameter | Type    | Description                                                                                                              |
|-----------|---------|--------------------------------------------------------------------------------------------------------------------------|
| `totalPages`    | integer | The total number of pages, which means this value, rounded up: `totalItems` / `pageSize`. **MUST** be named `totalPages` |



### Cursor / Keyset Pagination

This strategy is based on these query parameters:

| Parameter | Type    | Description                                                                            |
|-----------|---------|----------------------------------------------------------------------------------------|
| `cursor`  | string  | An opaque string identifying the next page of items to get. **MUST** be named `cursor` |
| `pageSize`    | integer | Number of items per page. **MUST** be named `pageSize`                                 |

Cursor-based pagination is based on a `cursor` that is created when handling requests from the client, and it is returned to the client (in the response body).
The cursor points to the next page of items. Sorting parameters, `pageSize` and filters may also be embedded in the cursor. 

On the next request from the client, the cursor is sent back to the service. 
The service returns the requested items and calculates a new cursor. In this way, the client can paginate through items.

Clients should not inspect or parse cursors - a cursor should be treated as an opaque string with an unknown and possibly changing format.

**Example requests:**

First request (no cursor available to client yet):
```http
GET /api/v1/bus-stops?city=Oslo&pageSize=20
```
The response includes a cursor for the next page. To fetch the next page:
```http
GET /api/v1/bus-stops?city=Oslo&pageSize=20&cursor=eyJpZCI6MTAwfQ
```

#### Cursor key selection

The cursor must encode a value (or set of values) that uniquely and stably identifies a position in the sorted result set. 

Example cursor with multiple values:

```json
{
  "id": "fa760939-dacc-4653-be5b-bfe6e87d9fcf",
  "sort": "name"
}
```

Example cursor key for encoding a single value (e.g. database id):
```
100
```


#### Encoding
The cursor **MUST** be URL-safe (no URL-encoding required). Because the cursor should be opaque to the client and may contain internal details, 
it may be Base64 encoded. For cursors with multiple values, a common solution is to have JSON in string value and then Base64-encode the string.
If the cursor contains data that you do not want to expose, the cursor may be encrypted and then Base64 encoded.

#### Response format

The response **MUST** contain the following fields:

| Parameter | Type    | Description                                                                                                                         |
|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| `items`  | array   | **MUST** be named `items`.                                                                                                          |
| `cursor`  | string  | An opaque string pointing to next item to get. If no more items, cursor value is not returned to client. **MUST** be named `cursor` |


### Choosing a Strategy

Use the comparison table below to select the pagination strategy that best fits your use case.

| Criterion                        | Page + Size (Offset)                                                                                                    | Cursor                                                            |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **Ease of use**                  | Widely understood; broad framework support                                                                              | Less familiar to most clients; a bit more work on the server side |
| **Jump to arbitrary page**       | ✅ Supported                                                                                                            | ❌ Not supported — only sequential traversal                      |
| **Consistency under data changes** | ⚠️ Inserts/deletes between requests may cause duplicates or missing items                                               | ✅ Stable — cursor anchors position in the data set               |
| **Performance on large data sets** | ⚠️ `OFFSET` queries degrade as page number grows, because the database must scan and discard all rows before the offset | ✅ Constant-time lookups               |

As a rule of thumb, cursor pagination **SHOULD** be used unless: offset pagination DB queries are not too heavy and inserts and deletes are infrequent OR jumping to specific pages must be supported.

## Sorting
Sorting may of course be implemented without pagingation, but when using pagination you must also use sorting.

:eyes: If you implement sorting, you **MUST** use query parameter "sort".
You **MAY** also allow sorting on multiple levels, and allow specifying sort order (desc / asc).
In your service, always use a secondary sorting on a unique id, so that two entries with the same primary sorting
(e.g. created date) are always sorted in the same order.

Example: 
```http
GET /api/v1/bus-stops?city=Oslo&sort=name,asc&sort=something,desc
```