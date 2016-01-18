'use strict'

module.exports = function (io) {
  let Result = require('../models/result');

  let router = require('express').Router();

  let apiKeyHeader = 'x_obeo_10years_api_key';
  let REAL_API_KEY = process.env.OBEO_API_KEY || 'jarjarbinks';

  let getResults = (req, res) => {
    Result.find({activity: req.params.activityId}, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (req.query.all) {
        res.send(results);
      } else {
        let leaderboard = {
          'starwars': 0,
          'got': 0,
          'bttf': 0,
          'matrix': 0,
          'himym': 0
        };

        results.forEach((result) => {
          if (leaderboard[result.team] < result.score) {
            leaderboard[result.team] = result.score;
          }
        });

        let leaderboardArray = [];
        Object.keys(leaderboard).forEach((key) => {
          leaderboardArray.push({
            team: key,
            score: leaderboard[key]
          });
        });

        leaderboardArray.sort((first, second) => {
          return (first.score < second.score) || (first.score === second.score && first.team.localeCompare(second.team));
        });

        res.send(leaderboardArray);
      }
    })
  };

  let createResult = (req, res) => {
    let apiKey = req.headers[apiKeyHeader];
    if (apiKey !== REAL_API_KEY) {
      res.status(401).send();
    } else {
      let body = {
        activity: req.params.activityId,
        team: req.body.team,
        score: req.body.score
      };

      let newResult = new Result(body);
      newResult.save((err, resultSaved) => {
        if (err) {
          res.status(400).send(err);
        } else {
          io.emit('results_updated');

          res.status(201).send(resultSaved);
        }
      });
    }
  };

  let deleteResult = (req, res) => {
    let apiKey = req.headers[apiKeyHeader];
    if (apiKey !== REAL_API_KEY) {
      res.status(401).send();
    } else {
      Result.findByIdAndRemove(req.params.resultId, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(203).send();
        }
      });
    }
  };

  router.get('/activities/:activityId/results', getResults);
  router.post('/activities/:activityId/results', createResult);
  router.delete('/activities/:activityId/results/:resultId', deleteResult);

  return router;
};
