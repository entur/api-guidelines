# Sorting

When an API response is sorted, it means that the order is deterministic: the same
request **MUST** return items in the same order.
Note that a sorted response does not require that the client can control the sorting; the endpoint
may return items in a predetermined order.

## Client-controlled sorting

Client-controlled sorting **MUST** use the query parameter `sort`.

| Parameter | Type   | Description                                         |
|-----------|--------|-----------------------------------------------------|
| `sort`    | string | The field(s) to sort on.  |

Example:
```http
GET /api/v1/bus-stops?sort=name
```

### Sort field and direction

A `sort` value is a field name, optionally followed by a comma (`,`) and a
sort direction, either `asc` (ascending) or `desc` (descending):

```http
GET /api/v1/bus-stops?sort=name,asc
```

- If the direction is omitted, the direction **MUST** default to `asc`.
- The direction tokens `asc` and `desc` **MUST** be treated as
  case-insensitive.

### Sorting on multiple fields

You **MAY** allow sorting on multiple fields by repeating the `sort` parameter:

```http
GET /api/v1/bus-stops?sort=name&sort=created
```

Each field **MAY** have its own direction:

```http
GET /api/v1/bus-stops?sort=name,asc&sort=created,desc
```

### Allowed sort fields

You **MUST** document which fields are sortable.

### Case sensitivity, collation and null ordering

- For string fields, the API **SHOULD** document whether sorting is
  case-sensitive and which collation/locale is used. For Norwegian data,
  sorting **SHOULD** order the letters `æ`, `ø` and `å` according to Norwegian
  collation rules.
- The API **SHOULD** document where `null` or missing values are placed
  (sorted first or last).


### Tiebreaking
To achieve a deterministic order, the sorting implementation **MUST** include sorting on a unique,
stable field (typically `id`). This means for example that if client requests sorting on `name`, and
`name` is not unique across all items, a secondary sort must also be applied on a unique field.

**Example**

```http
GET /item/v1/items?sort=name,asc
```

```json
{
  "items": [
    {
      "id": "100",
      "name": "Item A"
    },
    {
      "id": "101",
      "name": "Item A"
    },
    {
      "id": "99",
      "name": "Item B"
    }
  ]
}
```

In this example, the client requested items sorted on `name` ascending. There
are two items with the name "Item A" but the backend applies a secondary sort on `id`, so they are
always returned in the same order (`100` before `101`). The item with `id` 99
is still returned last, because the primary sort is on `name` and "Item B"
sorts after "Item A".

## Default sort order
You **SHOULD** define and document a default sort order that is applied when
the client does not provide a `sort` parameter.
If the default order is **not** deterministic, that **MUST** also be documented.
