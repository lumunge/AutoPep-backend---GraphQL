# AutoPEP GraphQL API.

## CURL API Requests.

#### Create new user

```curl
curl 'http://localhost:8000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8000' --data-binary '{"query":"# Write your query or mutation here\nmutation createUser($input: CreateUserData!){\n  createUser(input: $input){\n    _id\n    email\n    name\n  }\n}","variables":{"input":{"email":"user@yahoo.com","name":"user","password":"123456"}}}' --compressed
```

#### User login

```
curl 'http://localhost:8000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8000' --data-binary '{"query":"mutation login($input: LoginUserData!){\n  login(input: $input)\n}","variables":{"input":{"email":"user@yahoo.com","password":"123456"}}}' --compressed
```

#### Get current user

```
curl 'http://localhost:8000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8000' --data-binary '{"query":"query {\n  curr {\n    _id\n    name\n    email\n  }\n}\n"}' --compressed
```

#### Create Car

```
curl 'http://localhost:8000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8000' --data-binary '{"query":"mutation createCar($input : CreateCarData!){\n  createCar(input: $input){\n    _id\n    carId\n    user\n    carName\n    make\n    model\n    year\n    showroom\n    selectedFile1\n    selectedFile2\n    selectedFile3\n    selectedFile4\n    selectedFile5\n  }\n}","variables":{"input":{"carName":"MustangII","make":"GT","model":"500","year":2012,"showroom":"Show room 1","selectedFile1":"https://image1","selectedFile2":"https://image2","selectedFile3":"https://image3","selectedFile4":"https://image4","selectedFile5":"https://image5"}}}' --compressed
```

#### Get all cars

```
curl 'http://localhost:8000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8000' --data-binary '{"query":"query cars {\n  cars {\n    carId\n    user\n    carName\n    make\n    model\n    year\n    showroom\n    selectedFile1\n    selectedFile2\n    selectedFile3\n    selectedFile4\n    selectedFile5\n  }\n}"}' --compressed
```

#### Get single car

```
curl 'http://localhost:8000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8000' --data-binary '{"query":"query car($input : GetCarData!){\n  car(input: $input) {\n    carId\n    user\n    carName\n    make\n    model\n    year\n    showroom\n    selectedFile1\n    selectedFile2\n    selectedFile3\n    selectedFile4\n    selectedFile5\n  }\n}","variables":{"input":{"carId":"car_spolizggei"}}}' --compressed
```
