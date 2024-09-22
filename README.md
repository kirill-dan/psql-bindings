# psql-bindings npm module
Package that helps use native PostgreSQL queries with named bindings for NodeJS

### Installation
**npm**: npm install psql-bindings  
**yarn**: yarn add psql-bindings

### Using:
```
import DB from 'psql-bindings';

const sql = 'SELECT u.name, u.email FROM public.users u WHERE u.id = :id';  
const user = await DB.query(sql, { bindings: { id: 15 } });  
```
