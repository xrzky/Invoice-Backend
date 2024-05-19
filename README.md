# Invoice Backend

## Invoice Backend
is a backend project designed to create a REST API that facilitates the creation of invoices for product purchases by users. Users are able to add invoices for product purchases, modify products based on invoices, view invoices for all purchase transactions, and delete invoices.

### File ENV
Create a file named '.env' and fill it by referring to the contents of the '.env.example' file for configuration in database.js.

# Endpoint Users

### Create Database
```cmd
npx sequelize db:create
```

### Migrate Database
```cmd
npx sequelize db:migrate
```

## Register Users
```js
localhost:3000/users/register
```

Body
```json
{
    "fullname": "string",
    "email": "string",
    "password": "string"
}
```

## Login Users
```js
localhost:3000/users/login
```

Body
```json
{
    "email": "string",
    "password": "string",
}
```

# Endpoint Product

## Add Product

POST

```js
localhost:3000/products
```

Body
```json
{
    "title": "string",
    "price": "integer"
}
```


## Get All Product

GET

```js
localhost:3000/products
```

## Get Product By Id

GET

```js
localhost:3000/products/:id
```

Params
```js
id = 'integer'
```

## Update Product

PUT or PATCH

```js
localhost:3000/products/:id
```

Params
```js
id = 'integer'
```

Body
```json
{
    "title": "string",
    "price": "integer"
}
```

## Delete Product

DELETE
```js
localhost:3000/products/:id
```

Params
```js
id = 'integer'
```

# Endpoint Transaction

## Add Transaction

POST
```js
localhost:3000/transactions
```

Authorization
```js
<token>
```

Body
```json
{
    "items": [
        {
            "ProductId": "integer",
            "quantity": "integer"
        },
        {
            "ProductId": "integer",
            "quantity": "integer"
        }
    ]
}
```

## Get Transaction

GET
```js
localhost:3000/transactions
```

Authorization
```js
<token>
```

## Get Transaction By Id

GET
```js
localhost:3000/transactions/:id
```
Authorization
```js
<token>
```

Params
```js
id = 'integer'
```

## Update Transaction By Id

PUT or PATCH
```js
localhost:3000/transactions/:id
```

Authorization
```js
<token>
```

Params
```js
id = "integer"
```

Body
```json
{
    "items": [
        {
            "ProductId": "integer",
            "quantity": "integer"
        },
        {
            "ProductId": "integer",
            "quantity": "integer"
        }
    ]
}
```

## Delete Transaction

DELETE
```js
localhost:3000/transactions/:id
```

Authorization
```js
<token>
```

Params
```js
id = "integer"
```
