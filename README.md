# Tour Guide App
## Local Setup
If not done already, clone this repository using:

```
$ https://github.com/dnl20/tour-guide-app.git
```

Done? Great, now install the dependencies (this might take a little while):

```
$ cd angular-master-class-starter
$ npx yarn install
```

> You may also need to globally install the Angular-Cli:  `npm i -g @angular/cli`


## Local Setup

You have to set up the Google Map API in /src/google-map.ts like the following: 
export const API_KEY = 'API_KEY';


## Web and App Servers

To launch your web application, use a Terminal session with the command:

```
$ ng serve
```

This starts a web server for the Angular application; open with a browser url `http://localhost:4200`.

And since your Angular application may request external, remote data [from `http://localhost:4201/api`], you will need a local app server to respond to the REST API calls. We have already configured a server as part of this repository.

Simply start a second, separate Terminal session with the commend:

```
$ npm run rest-api
```


