# Todo

## Description

Todo app, that covers the CRUD operations.  
🛠 Created with Node.js, Express, PostgreSQL, JavaScript and React with custom UI.

![Todo List](https://raw.githubusercontent.com/lilla-nemeth/todo/main/frontend/src/assets/screenshots/app_screenshot_00.png)


## Features

- Registration
- Login/Log out
- Fetch the user's all todos
- Create new todo element
- Edit the name of todo
- Set completed status to todo element
- Delete one or more selected todo
- Set the order of todos by date, importance and completion (each filter effect the other)

## Installing, running locally  

Clone the repo

```
git clone https://github.com/lilla-nemeth/todo.git
```

### Server

Go to the project root directory
```
cd todo
```

Install the dependencies

```
npm install
```

Run the server
```
nodemon index.js
```
Server is running on port 3002
</br></br>
### Client

Go to the frontend folder
```
cd frontend
```
Install the dependencies

```
npm install
```

Start the client
```
npm start
```

## Environment Variables

To run this app, you need to add the following environment variables to your .env file

### Server

#### Postgres

`PG_HOST`
`PG_USER`
`PG_PASSWORD`
`PG_PORT`
`PG_DATABASE`

## License

MIT
