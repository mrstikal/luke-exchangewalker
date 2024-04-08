# Luke Exchangewalker

## What's that?

This is a small project, using Česká spořitelna's sandbox API to retrieve a exchange rate ticket.  
It was created using NX, React, React Router, React Query, Zustand, Lodash, GASP, etc. ... and Ashla, the light side of the Force :)

## Why are there light pop culture references?
When I started to think about this project: walk through the list of currencies ... wait, who is walker ... Luke is the best walker - Luke Skywalker.  
And I couldn't leave that thought behind.  
If you like StarTrek better, I apologize :)

## How to run this app
Clone this repository.  

Create an .env file in the root directory and insert VITE_API_KEY=_your sandbox key_
  
Run 
```
npm install
```

Run
```
npm run dev
```
for development mode  
or

```
npm run build
```
to build app.

To check if the code is correct, run
```
npm run lint
```

## Why is the state manager used?
The sandbox api used does not provide details about the specific currency.
So when the application starts, we load the complete list of currencies, save it to the store and continue working with this store - we read from it both the list of currencies and the currency detail.  

It's not quite perfect, but it works unless the user spends a large number of hours in the app.

This will allow to reduce the load on the app to almost zero.

## About custom hooks
Two custom hooks are used.  
One loads any url using Axios and React Query.  
The second one uses the first one to retrieve all the necessary source data.

## Do you have any questions?
Please feel free to contact me at [email](mailto:a@mrstik.cz)
