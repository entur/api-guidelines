# Sorting

If you implement sorting, you **MUST** use the query parameter `sort`.

| Parameter | Type   | Description                                         |
|-----------|--------|-----------------------------------------------------|
| `sort`    | string | The field(s) to sort on. **MUST** be named `sort`.  |

Example:
```http
GET /api/v1/bus-stops?city=Oslo&sort=name
```

## Sort field and direction

A `sort` value is a field name, optionally followed by a comma (`,`) and a
sort direction — either `asc` (ascending) or `desc` (descending):

```http
GET /api/v1/bus-stops?city=Oslo&sort=name,asc
```

- If the direction is omitted, the direction **MUST** default to `asc`.
- The direction tokens `asc` and `desc` **MUST** be treated as
  case-insensitive.
- The comma separates a **field from its direction**. A single `sort` value
  **MUST NOT** contain more than one field (i.e. `sort=name,created` is
  invalid). To sort on multiple fields, see below.

## Sorting on multiple fields

You **MAY** allow sorting on multiple fields by repeating the `sort` parameter:

```http
GET /api/v1/bus-stops?city=Oslo&sort=name&sort=created
```

Each field **MAY** have its own direction:

```http
GET /api/v1/bus-stops?city=Oslo&sort=name,asc&sort=created,desc
```

When multiple `sort` parameters are given, the **order of the parameters
defines the sort precedence**. The first `sort` is the primary sort key, the
second is the secondary key (used to break ties in the first), and so on.

## Allowed sort fields

You **MUST** document which fields are sortable.

## Default sort order

You **SHOULD** define and document a default sort order that is applied when
the client does not provide a `sort` parameter. The default order **MUST** be
deterministic and stable across identical requests.

## Case sensitivity, collation and null ordering

- For string fields, the API **SHOULD** document whether sorting is
  case-sensitive and which collation/locale is used. For Norwegian data,
  sorting **SHOULD** order the letters `æ`, `ø` and `å` according to Norwegian
  collation rules.
- The API **SHOULD** document where `null` or missing values are placed
  (sorted first or last).

## Deterministic and stable ordering

The result order **MUST** be deterministic: if the same request is made again
(with unchanged data), the items **MUST** be returned in the same order.

To achieve this, the backend **MUST** apply a final tiebreaker on a unique,
stable field (typically `id`) whenever the requested sort fields do not by
themselves guarantee a total ordering.

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
