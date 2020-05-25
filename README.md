# iLert uptime monitor integration sample

This setup is a resource that has been created for our blogpost on [building integrations with the iLert API for uptime monitoring and shareable reports](https://engineering.ilert.com/dynamic-uptime-monitor-report-integrations-22-05-2020).

## Requirements

* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org/de/download/)
* an [iLert account](https://app.ilert.com/signup.jsf)

## Setup & run

* clone this repository `git clone git@github.com:iLert/uptime-monitor-integration-sample.git`
* move to server dir `cd server`
* install dependencies `npm install`
* update `./server.js#13` with your iLert user information
* start server `npm start`
* visit `http://localhost:3333` in your browser

## Disclaimer

This repository contains code that has been created and published with the purpose of providing a better understanding on how uptime monitoring can be integrated in multi tenant scenarios into 3d party applications. The code in the sample is not meant to be used in production without applying any changes.
