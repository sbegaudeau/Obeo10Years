'use strict'

var Result = require('../models/result');

var router = require('express').Router();

let getResults = (req, res) => {
  Result.find((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let leaderboard = {
        'starwars': {
          'mario': 0,
          'cocktail': 0,
          'lego': 0,
          'robots': 0,
          'babyfoot': 0,
          'quizz': 0
        },
        'got': {
          'mario': 0,
          'cocktail': 0,
          'lego': 0,
          'robots': 0,
          'babyfoot': 0,
          'quizz': 0
        },
        'bttf': {
          'mario': 0,
          'cocktail': 0,
          'lego': 0,
          'robots': 0,
          'babyfoot': 0,
          'quizz': 0
        },
        'matrix': {
          'mario': 0,
          'cocktail': 0,
          'lego': 0,
          'robots': 0,
          'babyfoot': 0,
          'quizz': 0
        },
        'himym': {
          'mario': 0,
          'cocktail': 0,
          'lego': 0,
          'robots': 0,
          'babyfoot': 0,
          'quizz': 0
        }
      };

      results.forEach((result) => {
        if (leaderboard[result.team][result.activity] < result.score) {
          leaderboard[result.team][result.activity] = result.score;
        }
      });

      let leaderboardArray = [];
      Object.keys(leaderboard).forEach((key) => {
        let results = leaderboard[key];

        let total = 0;
        Object.keys(results).forEach((resultKey) => {
          total = total + results[resultKey];
        });

        leaderboardArray.push({
          team: key,
          details: results,
          score: total
        });
      });

      leaderboardArray.sort((first, second) => {
        return (first.score < second.score) || (first.score === second.score && first.team.localeCompare(second.team));
      });

      res.send(leaderboardArray);
    }
  })
};

router.get("/results", getResults);

module.exports = router;
