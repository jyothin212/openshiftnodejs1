var express = require('express')
var app = express()


const request = require('request');


exports.getMessage = function (req, res) {

	res.send("hello world from API");
}

exports.getGitApi = function (req, res) {

	var response = {};
	var projectarray = [];
	getGitApiOutput(function (err, result) {
		console.log("result --"+JSON.parse(result.body).length)
	   projects = JSON.parse(result.body)
	   projects.forEach(element => {
		   if(element.site_admin == true)
			projectarray.push(element);
		});
		res.send(projectarray);

    });
}

function getGitApiOutput(cb) {
	var options = {
		url: "https://api.github.com/users?since=135",
		method: 'GET',
		headers: {
			"User-Agent": "narra"
		}
	}
    responseBody = {};
	request(options, function (err,body) {

		if (err){
			console.log("errror is " + err);
			cb(err,{})
		}
		else {

			cb({},body);
		}
	})
	
}
