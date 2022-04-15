# Bitcoin Price checker app

This Nodejs-Express-Mongo app fetches and saves Bitcoin data on a 30 second schedule. Allows a Single user to register their Max, Min Prices & Email address. When the Price moves lower than Min and higher than Max then the User is sent a mail of the notification.
App also provides options to easily query the bitcoin prices and provides pagination options from the database.

# Disclaimer

I was not able to run Docker in my windows system, Though I have added all Steps to recreate the Project locally.

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

# run mongo replicaset
start "rep1" mongod -dbpath replicas\rep1 --port 30000 --replSet "test"
start "rep2" mongod -dbpath replicas\rep2 --port 40000 --replSet "test"
start "rep3" mongod -dbpath replicas\rep3 --port 50000 --replSet "test"

# login into mongo server
mongo --port 30000

# configure replica set ( if not already configured )
# insert code in the terminal

var testConfig = {
    _id: "test",
    members: [{
            _id: 0,
            host: 'localhost:30000',
            priority: 10
        },
        {
            _id: 1,
            host: 'localhost:40000'
        },
        {
            _id: 2,
            host:'localhost:50000',
            arbiterOnly: true
        }
    ]
}

# run command
rs.initiate(testConfig);

# run app
npm start

# view app
app starts running on port 8080
```

# API Endpoints

Request : GET http://localhost:8080/api/prices/btc?date=15-04-2022&limit=10&offset=0

Success Response :
HTTP 200
{
"url": "http://localhost:8080/api/prices/btc?date=15-04-2022&offset=0&limit=100",  
 "next": "http://localhost:8080/api/prices/btc?date=15-04-2022&offset=100&limit=100",
"count": 40,  
 "data": [
{
"timestamp": "DD-MM-YYYY"
"price": 140,
"coin": "btc"
},
...
],  
}

Failure Response :
HTTP 400 Couldn't get all Coins

Request : POST http://localhost:8080/user/info
Request Body : { "email":"foo@foo.com", "min": 140, "max": 150};
Successful Response : HTTP 200 Updated User Info successfully
Failure Response : HTTP 500 Failed to update user info <error message>

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
