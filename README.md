# Property Finder Test App

### Requirements to run

 - Nodejs
 - Yarn
 - Docker (Optional)

### How to run

To run the app open a console, go to the project folder and run this command:

`yarn start`

You will be available to open your browser at localhost:8080

### How to run with Docker

To run the app open a console, go to the project folder and run this command:

`yarn docker`

You will be available to open your browser at localhost:8080

### Notes

As they were not detail requirements I made the next assumptions:

 - Every route has 3 transports, I assume all transports are available for all routes, as It's reflect it on the data
 - In every route I pick the most beneficius route for the client base on his choose (Cost or Duration)
 - Some routes with discounts has negative values, as WE don't want to lose money, If the cost of the route has negative value, I just remove the discount as prevention, by doing this the route will have his normal price.
 - I designed the app thinking in doing it as simple as posible. I like to follow KISS methodology.
 - I don't make all the test I want to, but for manner of time I create some of them to show you I know how to make Unit Testing.
 - I use Bootstrap, FontAwesome and React from CDN's servers for Cache and easy implementation.

