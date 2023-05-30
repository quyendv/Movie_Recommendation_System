# Hi, I'm Quyen! 👋

## 🚀 About Me

- I am a student at the University of Engineering and Technology, Vietnam National University, Hanoi **(UET-VNU)**.
- I am studying to become a full-stack developer.

# QFlix (Full-Stack Responsive Movie Website - MERN)

Movie_Recommendation_System is a website providing a diverse range of films with images, trailers, reviews, posters, and similar movie recommendations. Easily explore the content, cast, directors, and other relevant information about your favorite films.

## Demo

[Qflix (Vercel and Render) ](https://qflix-quyendv.vercel.app/)

- Due to the use of `PaaS`, the application may be slow. If the website lags, please wait for a moment for the system to boot up.

## Tech Stack

**Client:** [React](https://react.dev/) ([Vite](https://vitejs.dev/)), [TailwindCSS](https://tailwindcss.com/), [Prettier](https://prettier.io/), [Sass](https://sass-lang.com/), [classnames](https://www.npmjs.com/package/classnames) (optinal), [Redux Toolkit](https://redux.js.org/), [Axios](https://axios-http.com/), [React Router](https://reactrouter.com/en/main), [React-Icon](https://react-icons.github.io/react-icons), [React Toastify](https://www.npmjs.com/package/react-toastify), [Swiper](https://swiperjs.com/), [React Hook Form](https://react-hook-form.com/) + [Yup](https://www.npmjs.com/package/yup), [Tippyjs](https://atomiks.github.io/tippyjs/), [Query-String](https://www.npmjs.com/package/query-string), [Date-fns](https://date-fns.org/)

**Server:** [Node](https://nodejs.org/), [Express](https://expressjs.com/), [MongoDB](odb.com) with [mongoose](mongoosejs.com/), [Bcryptjs](https://www.npmjs.com/package/bcryptjs), [Cors](https://www.npmjs.com/package/cors), [Dotenv](https://www.npmjs.com/package/dotenv), [Http-errors](https://www.npmjs.com/package/http-errors), [Joi](https://joi.dev/), [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [Nodemon](https://www.npmjs.com/package/nodemon), [Morgan](https://www.npmjs.com/package/morgan)

**RS server:** Python, Flask, flask_cors, TfidfVectorizer, ...etc

**Movie Data:** [The Movie DB](https://www.themoviedb.org/)

## Features

- SignIn, SignUp, Change Password
- Light/dark mode
- Responsive: The website interface compatible with all devices
- See details: popular, top rated, trailer, posters, comments, casts, ... etc about the movie.
- See recommendations for each movie (RS system: is disabled)
- Add to Favorites List
- Comment on the movie
- Search movie, series, person (cast)

## Updating Features

- Reset password via email.
- Search for movies by genre.
- Create movie lists by genre (similar to Favorites).
- Log in through Google, Facebook, ...
- ...

## Deployment

- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Client

`VITE_SERVER_PRODUCT = YOUR_PATH_HERE`

- Server

```
PORT = YOUR_PORT
CLIENT_LOCAL = YOUR_CLIENT_LOCAL
CLIENT_PRODUCT = YOUR_CLIENT_PRODUCT
DB_USER = YOUR_DB_USER
DB_PASSWORD = YOUR_DB_PASSWORD
MONGODB_URL = YOUR_MONGODB_URL
JWT_SECRET = YOUR_JWT_SECRET
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/quyendv/Movie_Recommendation_System.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies and start the server (both **client** and **server**)

```bash
  npm install && npm run dev
```

## API Reference

### TMBD

See more api at [themoviedb](https://developer.themoviedb.org/reference/intro/getting-started)

### NodeJS server

#### Get all items

See more api at `/server/api.rest`

## Preview

![image](https://github.com/quyendv/Movie_Recommendation_System/assets/80147846/b0c5696b-0e68-4217-8dde-87e4095ccc49)
![image](https://github.com/quyendv/Movie_Recommendation_System/assets/80147846/bc05cad5-b205-4080-8bb3-ff50137a1d17)
See more at [demo](https://qflix-quyendv.vercel.app/)
