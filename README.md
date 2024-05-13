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