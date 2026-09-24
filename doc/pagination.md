# Pagination

When implementing pagination, you **MUST** use either Cursor Pagination (preferred) or Offset Pagination, on the formats detailed below.  

## Offset Pagination

This strategy is based on these query parameters:

| Parameter | Type    | Description                                                                |
|-----------|---------|----------------------------------------------------------------------------|
| `offset`  | integer | Zero-based index of the first item to retrieve.  |
| `limit`       | integer | Number of items to get.                               |

Implementations **SHOULD** implement and document default and max values for `limit`.

**Example request:**

```http
GET /api/v1/bus-stops?city=Oslo&offset=10&limit=20
```

### Response format

The response **MUST** contain the following fields:

| Parameter    | Type    | Description                                                                |
|--------------|---------|----------------------------------------------------------------------------|
| `items`      | array   | Returned items.                                                            |
| `totalItems` | integer | The total number of items across all pages.  |
| `limit`      | integer | The requested `limit`, or max limit if given `limit` was over max.         |

**Example**

```json
{
  "items": [
    {
      "id": "100",
      "name": "Item 100"
    },
    {
      "id": "101",
      "name": "Item 101"
    }
  ],
  "totalItems": 2,
  "limit": 100
}
```

## Cursor / Keyset Pagination

This strategy is based on these query parameters:

| Parameter | Type    | Description                                                                            |
|-----------|---------|----------------------------------------------------------------------------------------|
| `cursor`  | string  | An opaque string identifying the next page of items to get.  |
| `pageSize`    | integer | Number of items per page.                                  |

Cursor-based pagination is based on a `cursor` that is created when handling requests from the client. The cursor is returned to the client in the response body.
The cursor points to the next page of items. Sorting parameters, `pageSize` and filters **MAY** also be embedded in the cursor. 

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

### Cursor key selection

The cursor **MUST** encode a value (or set of values) that uniquely and stably identifies a position in the sorted result set. 

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


### Encoding
The cursor **MUST** be URL-safe (no URL-encoding required). Because the cursor should be opaque to the client and may contain internal details, 
it **MAY** be Base64 encoded. For cursors with multiple values, a common solution is to have JSON in string value and then Base64-encode the string.
If the cursor contains data that you do not want to expose, the cursor **MAY** be encrypted and then Base64 encoded.

### Response format

The response **MUST** contain the following fields:

| Parameter | Type    | Description                                                                                                                         |
|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| `items`  | array   | Returned items.                                                                                                                     |
| `cursor`  | string  | An opaque string pointing to next item to get. If no more items, cursor value is not returned to client.  |


**Example**

```json
{
  "items": [
    {
      "id": "100",
      "name": "Item 100"
    },
    {
      "id": "101",
      "name": "Item 101"
    }
  ],
  "cursor": "eyJpZCI6MTAwfQ"
}
```

## Choosing a Strategy

Use the comparison table below to select the pagination strategy that best fits your use case.

| Criterion                          | Offset Pagination                                                                                                        | Cursor Pagination                                                 |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **Ease of use**                    | Widely understood; broad framework support                                                                               | Less familiar to most clients; a bit more work on the server side |
| **Jump to arbitrary position**     | ✅ Supported                                                                                                             | ❌ Not supported — only sequential traversal                      |
| **Consistency under data changes** | ⚠️ Inserts/deletes between requests may cause duplicates or missing items                                                | ✅ Stable — cursor anchors position in the data set               |
| **Performance on large data sets** | ⚠️ `OFFSET` queries degrade as offset gets bigger, because the database must scan and discard all rows before the offset | ✅ Constant-time lookups                                          |

As a rule of thumb, cursor pagination **SHOULD** be used unless: offset pagination DB queries are not too heavy and inserts and deletes are infrequent OR jumping to a specific position must be supported.

## Sorting

When using pagination you **MUST** return elements in a stable order, meaning the same request always results in a response where the items are in the same order.
Without a stable order, the boundary between pages is undefined: the same item may appear on multiple pages or be skipped entirely as the client paginates, and cursors can no longer reliably point to "the next item".
See [sorting](sorting.md) for more details. Note, however, that pagination does not require you to let clients control sort order, only that the order is stable for a given request.
