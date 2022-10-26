## FOllowing Traversy Media Tutorial to build a full stack application.

### Tech Stack

- Express js
- React js
- REST API
- JWT Authentication
- React Redux and Redux Toolkit
- Mongo DB
- Thunder Client as Postman

## Commands used in terminal -

```
npm init
```

```
npm i express dotenv mongoose colors
```

### Dev dependency:

nodemon to keep our server running and we don't have to restart it.

```
npm i -D nodemon
```

### In package.json:

```json
"scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"
  },
```

### Express async handler

```
npm i express-async-handler
```

### To encrypt passwords

```
npm i bcryptjs
```

### JSON Web Token (JWT)

```
npm i jsonwebtoken
```

## Frontend (inside frontend folder)

### Redux

```
npm i redux react-redux @reduxjs/toolkit
```

### React Router

```
npm i react-router-dom
```

### Icons

```
npm i react-icons
```

### Concurrently (Dev Dependency) to run backend and frontend together (in root folder)

```
npm i -D concurrently
```

### Scripts for running both simultaneously (root folder)

```json
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm run dev --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```

To run both together use (in root folder)

```
npm run dev
```

### Error while running mongoDB server in Atlas

- If server is not able to connect in MongoDB server web, go to network preference and update ur current IP address

## For APIs (in frontend folder)

### Axios to do requests

```
npm i axios
```

### react-toastify to show alerts, errors and success alerts

```
npm i react-toastify
```

### Adding proxy to frontend - package.json

- So that when we do api calls it goes to backend localhost instead of frontend
- Do that in vite.config.js

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```
