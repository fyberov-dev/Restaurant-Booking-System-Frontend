# Restaurant Reservation System (backend)

Reservation system for a restaurant with a filtering functionality and customizable floor planning.

## 0. Content

- [1. Tech Stack](#1-tech-stack)
- [2. Setup](#2-setup)
    - [2.1. Run locally](#21-run-locally)
    - [2.2. Run using docker](#22-run-using-docker)
- [3. Usage](#3-usage)
  [3.1. Debug Mode](#31-debug-mode)
- [4. Features for implementation](#4-features-for-implementation)
    - [4.1. Form Validation](#41-form-validation)
        - [4.1.1. What should be done?](#411-what-should-be-done)

Backend: https://github.com/fyberov-dev/Restaurant-Booking-System-Backend

## 1. Tech Stack

- Typescript
- React.js
- Vite.js
- TailwindCSS
- Docker
- Nginx

## 2. Setup

First of all, you need to clone and start backend repository: https://github.com/fyberov-dev/Restaurant-Booking-System-Backend

You need to clone a repository using:

1. HTTPS,

```shell
https://github.com/fyberov-dev/Restaurant-Booking-System-Frontend.git
```

2. or SSH.

```shell
git@github.com:fyberov-dev/Restaurant-Booking-System-Frontend.git
```

### 2.1. Run locally

Download dependencies:

```shell
npm install
```

Run in dev mode:

```shell
npm run dev
```

### 2.2. Run using docker

Find `.env.example` file in a root, alter it and delete ".example" from name of the file, so new name will be `.env`

`.env.example`

```
PROXY_TARGET=
```

For example, you can use next credentials (only in dev purposes):

`.env`

```
PROXY_TARGET=http://restaurant-booking-system-backend:8080
```

\*`restaurant-booking-system-backend` is the name of the backend container that should be started as well to work together

Create external network, if not created (but should be, if you ran backend that you should run first)

```shell
docker network create reservation_backend
```

Run docker

```
docker compose up --build -d
```

## 3. Usage

You need to install and setup backend, so frontend will work (https://github.com/fyberov-dev/Restaurant-Booking-System-Backend)

Access frontend using:
http://localhost:3000/

### 3.1. Debug Mode

When a Restaurant Plan is active press `/` to turn on the debug mode (currently shows only X and Y of a mouse pointer)

## 4. Features for implementation

### 4.1. Form Validation

Add form validation for reservation form

#### 4.1.1. What should be done?

Import [zod library](https://www.npmjs.com/package/zod) for easy validation and error messaging
