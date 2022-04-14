# Bitcoin Price checker app

This Nodejs-Express-Mongo app fetches and saves Bitcoin data on a 30 second schedule. Allows a Single user to register their Max, Min Prices & Email address. When the Price moves lower than Min and higher than Max then the User is sent a mail of the notification.
App also provides options to easily query the bitcoin prices and provides pagination options from the database.

# Disclaimer

I was not able to run Docker in my windows system, Though I have added all Steps to recreate the Project locally.

## Installation

Clone the Project in your Local system

```bash
git clone <project.link>
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
