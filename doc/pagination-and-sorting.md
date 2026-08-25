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

| Parameter | Type    | Description                                                                        |
|-----------|---------|------------------------------------------------------------------------------------|
| `items`  | array   | **SHOULD** be named `items` unless there is a specific reason to use another name. |
| `totalCount`    | integer | The total number of items across all pages. **MUST** be named `totalCount`         |

### Cursor / Keyset Pagination

This strategy is based on these query parameters:

| Parameter | Type    | Description                                                                       |
|-----------|---------|-----------------------------------------------------------------------------------|
| `cursor`  | string  | An opaque string pointing to the **next** item to get. **MUST** be named `cursor` |
| `pageSize`    | integer | Number of items per page. **MUST** be named `pageSize`                                |

Cursor-based pagination is based on a `cursor` that is created when handling requests from the client, and it is returned to the client (in the response body).
The cursor points to the next item coming after the items that you are returning. 
Sorting parameters, number of items (`pageSize`) to get and filters are also embedded in the returned cursor. 

On the next request from the client, the cursor is sent back to the service (along with any other parameters). 
The service returns the requested items and calculates a new cursor pointing to the next item. In this way, the client can paginate through items.

Clients should not inspect, parse, or construct cursors themselves — a cursor should be treated as an opaque string with an unknown and possibly changing format.

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
The cursor should a unique id for the next item, which can be used as a starting point for the service when getting items. The id is typically an id for a row in a database table.
The cursor may also contain a timestamp for the row, which is useful if the row could be deleted, so that the id can not be used.

#### Encoding
Because the cursor should be opaque to the client and may contain internal details, it should be Base64 encoded.
If the cursor contains data that you do not want to expose, the cursor may be encrypted and then Base64 encoded.

#### Response format

The response **MUST** contain the following fields:

| Parameter | Type    | Description                                                                                          |
|-----------|---------|------------------------------------------------------------------------------------------------------|
| `items`  | array   | **SHOULD** be named `items` unless there is a specific reason to use another name.                   |
| `cursor`  | string  | An opaque string pointing to next item to get. **MUST** be named `cursor`                            |
| `hasMore`    | boolean | Are there more items, or did the last request return all remaining items?  **MUST** be named `hasMore` |


### Choosing a Strategy

Use the comparison table below to select the pagination strategy that best fits your use case.

| Criterion                        | Page + Size (Offset)                                                                                                    | Cursor                                                            |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **Ease of use**                  | Widely understood; broad framework support                                                                              | Less familiar to most clients; a bit more work on the server side |
| **Jump to arbitrary page**       | ✅ Supported                                                                                                            | ❌ Not supported — only sequential traversal                      |
| **Consistency under data changes** | ⚠️ Inserts/deletes between requests may cause duplicates or missing items                                               | ✅ Stable — cursor anchors position in the data set               |
| **Performance on large data sets** | ⚠️ `OFFSET` queries degrade as page number grows, because the database must scan and discard all rows before the offset | ✅ Constant-time lookups               |
| **Sharded / NoSQL databases**    | ⚠️ Difficult to implement efficiently                                                                                   | ✅ Well suited — relies on key ordering rather than global offset |

As a rule of thumb, cursor pagination **SHOULD** be used unless the number of items is small, inserts and deletes are infrequent, and jumping to specific pages must be supported.

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