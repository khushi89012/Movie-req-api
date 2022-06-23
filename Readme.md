### Movie Requests API Documentation

### Clone the repository

    git clone


### Install the dependencies

    npm install


### Run the server
    
    npm start


### Run the tests

## GET /

    you can access the API from the browser by typing the following URL:

    http://localhost:8000/
  


## GET /:id

    for id route you need to login first.
    and using the token you get from the login you can make the request.


    http://localhost:8000/:id


## POST /

    for <POST> route you need to login first.
    and using the token you get from the login you can make the request.


    http://localhost:8000/


## PUT /ratings/:id
    for <PUT> route you need to login first.
    and using the token you get from the login you can make the request.

     PUT -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"rating":5}' http://localhost:8000/ratings/<id>


## GET /fetch

    for Fetch route you need to provide token in the header.


    


