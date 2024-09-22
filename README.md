# psql-bindings npm module
Package that helps use native PostgreSQL queries with named bindings for NodeJS

### Installation
**npm**: npm install psql-bindings  
**yarn**: yarn add psql-bindings

### Settings
It should have a .env file in the project root with the following format:
```javascript
TIMEZONE=Europe/Riga
DB_HOST=localhost
DB_NAME=db_name_string
DB_USER_NAME=db_user_string
DB_PASSWORD=db_password_string
DB_PORT=5432
```
The .env file will be parsed into key-value pairs and stored in the global.env variable.


### Using:
```javascript
import DB from 'psql-bindings';

const sql = 'SELECT u.first_name, u.last_name, u.email FROM public.users u WHERE u.id = :id';  
const user = await DB.query(sql, { bindings: { id: 15 } });  
```

If the user is found, you will have the following data format user[0]:
```javascript
{
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
}
```
