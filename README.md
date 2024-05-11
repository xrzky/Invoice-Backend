# Invoice Backend

## Invoice Backend
adalah backend project untuk membuat REST-API yang berguna untuk membuat sebuah invoice dari pembelian product oleh user. Yang mana user dapat menambahkan invoice dari pembelian product, mengubah product berdasarkan invoice, melihat invoice dari semua transaksi pembelian dan menghapus invoice.

### File ENV
membuat file dengan nama '.env' diisi dengan melihat dari file '.env.example' untuk pengisi pada config.js

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