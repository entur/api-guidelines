# Sorting

When an API response is sorted, it means that the order is deterministic: the same
request **MUST** return items in the same order.

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
To achieve a deterministic order, the sorting implementation **MUST** append a unique
field with a stable value (typically `id`) as a final tiebreaker. For example, if a
client requests sorting on `name` and `name` is not unique across all items, a secondary
sort **MUST** also be applied on a unique field.

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

### Documenting in OpenAPI

The documentation requirements above (allowed sort fields, default order, case
sensitivity, collation and null ordering) **MUST** be expressed on the `sort`
query parameter in your OpenAPI specification.

**Example**
```json
{
  "parameters": [
    {
      "name": "sort",
      "in": "query",
      "description": "Field(s) to sort on. Repeat the parameter to sort on multiple fields. Each value is a field name optionally followed by a direction: `<field>,<asc|desc>`.\n\n**Sortable fields:** `name`, `created`.\n\n**Collation:** String fields are sorted case-insensitively using Norwegian collation.\n\n**Null ordering:** Items with a `null` or missing value for the sort field are placed last, regardless of sort direction.",
      "schema": {
        "type": "array",
        "items": {
          "type": "string",
          "pattern": "^(name|created)(,(asc|desc))?$"
        },
        "default": ["name,asc"],
        "example": ["name,asc", "created,desc"]
      }
    }
  ]
}
```

## Sorting not controlled by client
A sorted response does not require that the client can control the sorting; the endpoint
may return items in a predetermined order. When the order is fixed, you
**MUST** document it on the response field for the collection:

**Example**
```json
{
  "items": {
    "type": "array",
    "description": "Sorted by `name` ascending, with `id` as a tiebreaker. This ordering is fixed and cannot be changed by the client.",
    "items": {
      "$ref": "#/components/schemas/Item"
    }
  }
}
```

## Non-sorted responses
If a returned collection is not sorted, that **MUST** also be documented:

**Example**
```json
{
  "items": {
    "type": "array",
    "description": "The order is undefined and **MUST NOT** be relied upon; it may change between requests.",
    "items": {
      "$ref": "#/components/schemas/Item"
    }
  }
}
```