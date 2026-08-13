# Pagination Strategies

This document describes the two pagination strategies that should be used in Entur APIs, and a guide for when to use which strategy. 

## 1. Page + Size Pagination (Offset-based)

This strategy is based on these query parameters:

| Parameter | Type    | Description                                                        |
|-----------|---------|--------------------------------------------------------------------|
| `page`    | integer | Zero-based index of the page to retrieve. **MUST** be named `page` |
| `size`    | integer | Number of items per page. **MUST** be named `size`                 |

**Example request:**

```http
GET /api/v1/bus-stops?city=Oslo&page=1&size=20
```

When handling the request, the service skips `page * size` items and returns the next `size` items.
In the example above, items 21–40 are returned (page index `1` × size `20` = skip the first 20 items).

### 1.1 Response format

The response format will vary between APIs, but a typical response at least include the items along with the total number of items that can be paginated:

The response **MUST** contain the following fields:

| Parameter | Type    | Description                                                                        |
|-----------|---------|------------------------------------------------------------------------------------|
| `items`  | array   | **SHOULD** be named `items` unless there is a specific reason to use another name. |
| `totalCount`    | integer | The total number of items across all pages. **MUST** be named `totalCount`         |

## 2. Cursor / Keyset Pagination

This strategy is based on these query parameters:

| Parameter | Type    | Description                                                                       |
|-----------|---------|-----------------------------------------------------------------------------------|
| `cursor`  | string  | An opaque string pointing to the **next** item to get. **MUST** be named `cursor` |
| `size`    | integer | Number of items per page. **MUST** be named `size`                                |

Cursor-based pagination is based on a `cursor` that is created when handling requests from the client, and it is returned to the client (in the response body).
The cursor points to the next item coming after the items that you are returning.

Pagination direction, number of items to get and filters are **not** embedded in the cursor — they are sent separately by the client. 
This allows the client to change direction or filters independently without obtaining a new cursor.

On the next request from the client, the cursor is sent back to the service (along with any other parameters). 
The service returns the requested items and calculates a new cursor pointing to the next item. In this way, the client can paginate through items.

Clients should not inspect, parse, or construct cursors themselves — a cursor should be treated as an opaque string with an unknown and possibly changing format.

**Example requests:**

First request (no cursor available to client yet):
```http
GET /api/v1/bus-stops?city=Oslo&size=20
```
The response includes a cursor for the next page. To fetch the next page:
```http
GET /api/v1/bus-stops?city=Oslo&size=20&cursor=eyJpZCI6MTAwfQ
```

### Cursor key selection

The cursor must encode a value (or set of values) that uniquely and stably identifies a position in the sorted result set. 
The cursor should a unique id for the next item, which can be used as a starting point for the service when getting items. The id is typically an id for a row in a database table.
The cursor may also contain a timestamp for the row, which is useful if the row could be deleted, so that the id can not be used.

### Encoding
Because the cursor should be opaque to the client and may contain internal details, it should be Base64 encoded.
If the cursor contains data that you do not want to expose, the cursor may be encrypted and then Base64 encoded.

### 2.1 Response format

The response **MUST** contain the following fields:

| Parameter | Type    | Description                                                                                          |
|-----------|---------|------------------------------------------------------------------------------------------------------|
| `items`  | array   | **SHOULD** be named `items` unless there is a specific reason to use another name.                   |
| `cursor`  | string  | An opaque string pointing to next item to get. **MUST** be named `cursor`                            |
| `hasMore`    | boolean | Are there more items, or did the last request return all remaining items?  **MUST** be named `hasMore` |


## 3. Choosing a Strategy

Use the comparison table below to select the pagination strategy that best fits your use case.

| Criterion                        | Page + Size (Offset)                                                                                                    | Cursor                                                            |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **Ease of use**                  | Widely understood; broad framework support                                                                              | Less familiar to most clients; a bit more work on the server side |
| **Jump to arbitrary page**       | ✅ Supported                                                                                                            | ❌ Not supported — only sequential traversal                      |
| **Consistency under data changes** | ⚠️ Inserts/deletes between requests may cause duplicates or missing items                                               | ✅ Stable — cursor anchors position in the data set               |
| **Performance on large data sets** | ⚠️ `OFFSET` queries degrade as page number grows, because the database must scan and discard all rows before the offset | ✅ Constant-time lookups               |
| **Sharded / NoSQL databases**    | ⚠️ Difficult to implement efficiently                                                                                   | ✅ Well suited — relies on key ordering rather than global offset |

### Recommendations

- **Use Offset** when the dataset is smaller and inserts and deletes are infrequent, or when jumping to specific pages need to be supported (like when the UI displays a traditional page-number navigation).
- **Use Cursor** when the dataset is larger, inserts and deletes are more frequent, or when jumping to specific pages is not needed.

As a rule of thumb, prefer cursor based pagination unless jumping to a specific page must be supported.

## 4. Sorting
When using pagination the underlying data must be sorted. See [Sorting](guidelines.md#62-sorting).

