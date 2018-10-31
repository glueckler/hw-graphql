## 06

add support for this query (starting with a company id root query)

```
{
  user (id: "23") {
		company {
      id,
      name
    }
  }
}
```