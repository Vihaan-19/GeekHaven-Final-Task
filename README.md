
# Social Media Backend

A social media backend made using NodeJS, Express, and MongoDB.
Final Task of GeekHaven WebD Wing.




## Documentation

- [Features](#features)
- [Installation](#installation)
- [API](#api%20reference)
- [Optimizations](#optimizations)




## Features

- User Authentication and Authorization
- Registration and Login
- User Profile updates
- Create, upload, edit a post
- Like and dislike a post
- Follow/Unfollow an User
- Cross platform
- Create, upload reels
- Comment on post and reels



## Installation

Clone the project

```bash
git clone https://github.com/Vihaan-19/WebD-Selection-Final-Task.git geekh
cd geekh
```

Go to the project directory

```bash
cd geekh
```

Install dependencies

```bash
npm install
```

Start the server

```bash
nodemon app.js
```


## API Reference

### Signup and Login Routes

#### Sign Up

```http
  GET /api/auth/signup
```

```http
  POST /api/auth/signup
```

#### Login
```http
  GET /api/auth/login
```

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


#### Login

### Post Comment Routes
#### Add comment to a post
```http
  POST /api/posts/comments/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post to add comment to|

NOTE:- User Should be logged in


### Reel Routes
#### Show all reels
```http
  GET /api/reels
```

#### Post a reel
```http
  POST /api/reels
```
NOTE:- User should be logged in

#### Get a reel
```http
  GET /api/reels/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the reel|

#### Like / Dislike a reel
```http
  PUT /api/reels/${id}/like
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the reel|

NOTE:- User should be logged in


### Reel Comment Routes
```http
  POST /api/reels/comments/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of reel to add comment to|

NOTE:- User Should be logged in

## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

