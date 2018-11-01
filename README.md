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

## 07

add get user list from a single company id (one to many)

```
{
  user (id: "23") {
		company {
      id,
      users {
        firstName
      }
    }
  }
}
```

## 07

addUser mutation 

```
mutation {
  addUser(firstName: "Sandy", age: 99) {
    id
    firstName
    age
  }
}
```

