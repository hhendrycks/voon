# Voon #

![Voon weather app](react-client/dist/images/voon.png?raw=true)

## Given two days, build an MVP weather app for vampires. ##

_Stack_: 
* PostgreSQL
* Express
* Axios
* JavaScript
* React
* React Charts.js

_Features_: 
* Current weather summary
    * Message related to staying indoors/going outside based on UV index
* UV index forecast
    * Graph to show UV index by hour (12 hour forecast)
* Temperature forecast
    * Graph to show temperature by hour (12 hour forecast)
* Moon phase summary
    * renders image based on current moon phase

_Challenges_:
* My chosen API stopped working after day one, so I had to find a replacement.
    * I eventually selected Dark Sky, which only allowed queries by latitude and longitude.
    * This taught me to not fall down a rabbit hole of looking for API's which fit what I need perfectly: I might need to improvise, but I also need to keep being productive and move on.
* To allow users to query by a U.S. zip code, I stored U.S. zip codes and their coordinating latitude and longitude coordinates in a PostgreSQL database for fast look-up (primary key was the zip code). 
    * I considered using browser location for lat/long coordinates, but it would be less user-friendly to search for other locations.
* I didn't use any CSS frameworks. Styling took up a decent chunk of time, but this made the final UI more rewarding and gave me a good reminder of CSS basics. 
* As my main component grew, I realized I should have planned the back end in advance more to make for a cleaner main App component. 
