## Instalacion
Posicionados en la carpeta client y api realizar el siguiente comando
```
npm install
```

## Uso
En principio, dentro del archivo llamado db.js encontrado en api/src
```javascript
const sequelize = new Sequelize("verduleria", "dbUser", "dbPassword", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timestamps: false,
  native: true,
});
```
Se deben intercambiar "dbUser" y "dbPassword" por el usuario de la base de datos y contraseña respectivamente.

Luego ejecutar en la consola posicionada en api y client:
```
npm start
```
Por ultimo, para cargar la base de datos, se debe acceder a la siguiente URL:
```
localhost:3001/charge-db
```