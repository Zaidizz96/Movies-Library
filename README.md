## movies-library-1.0.0

**Author Name** : Zaid izzelddne

## WRRC 

### without using 3rd party api
![](./asset/DocScanner%2020%20Jun%202023%2010-16%20pm.jpg)

### requisting from 3rd party API (wrrc)
![](./asset/DocScanner%2022%20Jun%202023%2011-09%20pm.jpg)

### connection with postgress sql database using rest API 
![](./asset/wrrc.jpg)

## Overview:

## Getting Started:
please follow below steps
### 1- npm install 
### 2- npm start


## Project Features
### * threre are 3 routes that specify particular rendering resources 
### * (and there are more routes responisble for some events after connecting to 3rd party API)
### * also there are 5 endpoints to deal with postgress sql database using rest api.
### 1- (/) for home page rendering object
### 2- (/favorite) welcoming message
### 3- if you request any other route for now , there will be an 404 error.
### 4- (/trending) to get response of trending object movie comes from API server.
### 5- (/search) to search about specific movie name. 
### 6- (/popular) to get all popular movies in market
### 7- (/genere) to fetch all genere of movies and theire id
### 8- (/addMovie) to add specific movie by providing body with requset.
### 9- (/getMovies) to get all movies form database 
### 10-(/UPDATE/:id) to update comments of movies and we can acces them by provide path params (id).
### 11-(/DELETE/:id) to delete specific movie form database by passing (id) as params.
### 12-(/getMovie/:id) to get specific movies by passing (id) with request as params.


### note: to use this route, follow this url to get specific movie (/search?query={title of movie do you want })


 