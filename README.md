
# Social Media Backend

A social media backend made using NodeJS, Express, and MongoDB.
Final Task of GeekHaven WebD Wing.




## Documentation

- [Features](#features)
- [Installation](#installation)
- [API Reference](#api-reference)
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
- Using Cloudinary for uploading images and reels (ps it takes some time to upload reels)
- 



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


### User Routes

#### Logged In User-Profile
```http
  GET /api/users
```

#### Update Profile
```http
  PUT /api/users/${id}/update
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of logged in user to update |

NOTE:- User Should be logged in

#### Delete Profile
```http
  DELETE /api/users/${id}/delete
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of logged in user to delete |

NOTE:- User Should be logged in


#### Follow / Unfollow a Profile
```http
  PUT /api/users/${id}/follow
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of profile to follow/unfollow |

NOTE:- User Should be logged in



### Post Routes
#### Get a post
```http
  GET /api/posts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post  |



#### Get a post by category
```http
  GET /api/posts
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`|`string`|**Required**. Category of post

#### Get all posts of following {change this ttle}
```http
  GET /api/posts/timeline/all
```

#### Create a post
```http
  POST /api/posts
```
NOTE:- User Should be logged in

#### Update user post
```http
  PUT /api/posts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post to update|

NOTE:- User Should be logged in

#### Delete User Post
```http
  DELETE /api/posts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post to delete|

NOTE:- User Should be logged in


#### Like / Dislike a post
```http
  PUT /api/users/${id}/like
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post to like / dislike |

NOTE:- User Should be logged in



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
  GET /api/reels/${id}/like
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the reel|


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

