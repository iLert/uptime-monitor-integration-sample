"use strict";

const fs = require("fs");

// some basic Node.js dependencies to quickly setup an http server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// requires your iLert tenant information
// we suggest creating a custom user for the api calls
const { ILert } = require("ilert");
const ilert = new ILert({
    tenant: "YOUR-TENANT-HERE",
    username: "YOUR-USER-HERE",
    password: "YOUR-PASSWORD-HERE"
});

// most likely this will be mapped to the escalation policy resembling your customer
// or your internal team that manages outtages
const ESCALATION_POLICY = 2191524;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// quick way of serving our sample client on the root of this server
app.get("/", (req, res) => {
    fs.readFile("../client/index.html", "utf8", (error, file) => {
        if(error) {
            res
                .status(500)
                .end(error.message);
        } else {
            res
            .status(200)
            .header("content-type", "text/html")
            .end(file);
        }
    });
});

app.post("/monitor-sample", async (req, res) => {

    console.log(req.body);
    try {
        const response = await ilert.uptimeMonitor().create(
            // of course, instead of the policy you might also use the name
            // of the monitor to map it to your "customer"
           req.body.name,
            ILert.REGIONS.EU,
            ILert.CHECK_TYPES.HTTP,
            // again you will want to map this
            ESCALATION_POLICY,
            {
                url: req.body.url,
            },
            {
                intervalSec: 300,
                timeoutMs: 30000,
                createIncidentAfterFailedChecks: 1,
            },
        );
    
        res
            .status(response.status)
            .json(response.data);

    } catch(error) {
        res.status(500).end(error.message);
    }
});

app.get("/monitor-sample", async (req, res) => {
    const monitors = (await ilert.uptimeMonitor().get()).data;
    res.status(200).json(
        // we are only returning the monitors for this "customer" of yours
        // based on the policy.. again you will probably want to map this in some kind of way
        // this is just one way of doing it
        (await Promise.all(monitors.filter((monitor) => {
            return monitor.escalationPolicy.id === ESCALATION_POLICY;
        })
        .map((monitor) => {
            // to retrieve the detailed information including the shareable report
            // we fetch the expanded monitor
            return ilert.uptimeMonitor(monitor.id).get();
        })
        )).map((response) => response.data)
    );
});

app.listen(3333, () => {
    console.log("Uptime monitor integration sample listening on http://localhost:3333");
});