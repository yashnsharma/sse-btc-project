# Bitcoin Price checker app

This Nodejs-Express-Mongo app fetches and saves Bitcoin data on a 30 second schedule. Allows a Single user to register their Max, Min Prices & Email address. When the Price moves lower than Min and higher than Max then the User is sent a mail of the notification.
App also provides options to easily query the bitcoin prices and provides pagination options from the database.

## Installation

Clone the Project in your Local system

```bash
git clone https://github.com/yashnsharma/sse-btc-project/tree/master
```

## Usage

```
npm install

# cd into project
cd sse-btc-project/

# Install Packages
npm install

# Run Docker containers
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# run app
npm start

# view app
app starts running on port 8080
```

# API Endpoints

Request Description : GET API used to fetch bitcoin price in the date range, limit, offset specified in Query Parameters.
Also provides additonal pagination properties such as current url, next url, total count.

Request : `GET http://localhost:8080/api/prices/btc?date=15-04-2022&limit=10&offset=0`

Success Response :

```
HTTP 200
{
   "url": "http://localhost:8080/api/prices/btc?date=15-04-2022&offset=0&limit=100",
   "next": "http://localhost:8080/api/prices/btc?date=15-04-2022&offset=100&limit=100",
   "count": 40,
   "data": [
         {
            "timestamp": "DD-MM-YYYY"
            "price": 140,
            "coin": "bitcoin"
         },
         ...
   ],
}
```

Failure Response :
HTTP 400 Couldn't get all Coins

#

Request Description : POST API used to Save User Info such as User Email, Min & Max Limits. This info is used to Notify user when BTC Price moves around their Limits.

Request : `POST http://localhost:8080/user/info`

Request Body :

```
{
   "email":"foo@foo.com",
   "min": 140,
   "max": 150
};
```

Successful Response : `HTTP 200 Updated User Info successfully`

Failure Response : `HTTP 500 Failed to update user info <error message>`

```
Request Body :

{
"email":"foo@foo.com",
"min": 140,
"max": 150
};

```

Successful Response : `HTTP 200 Updated User Info successfully`

Failure Response : `HTTP 500 Failed to update user info <error message>`

#

Request Description : User Authentication & CRUD

```
[Creates Auth ] User Login : `POST http://localhost:8080/api/v1/user/login` BODY : `{"username":"<username">, "password":"<password>"`
[Requires Auth] Get User : `GET http://localhost:8080/api/v1/user/:id`
[Requires Auth] Create Users : `POST http://localhost:8080/api/v1/user/` BODY : `{"username":"<username">, "password":"<password>"`
```

## Tech used

Programming Language : Nodejs
Database : Mongodb

## Packages

1. express
2. mongoose
3. dotenv
4. axios
5. cron
6. nodemailer
7. moment
8. body-parser

```

```
