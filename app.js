const express = require('express');
const app = express();

// Error Handling
const ExpressError = require('./expressError');

// Import helper functions
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

// Routes:

// .get route to calculate mean
app.get('/mean', function(req, res, next) {
    if (!req.query.nums) {
      throw new ExpressError('Please pass a query key of numbers, with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if invalid values were inputed
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
  
  
    let result = {
      operation: "mean",
      result: findMean(nums)
    }
  
    return res.send(result);
  });

// .get route to calculate median 
  app.get('/median', function(req, res, next) {
    if (!req.query.nums) {
      throw new ExpressError('Please pass a query key of numbers, with a comma-separated list of numbers', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if invalid values were inputed
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
  
    let result = {
      operation: "median",
      result: findMedian(nums)
    }
  
    return res.send(result);
    
  });
  
//   Route to calculate mode
  app.get('/mode', function(req, res, next) {
    if (!req.query.nums) {
      throw new ExpressError('Please pass a query key of numbers, with a comma-separated list of numbers', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if invalid values are inputed
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
  
    let result = {
      operation: "mode",
      result: findMode(nums)
    }
  
    return res.send(result);
  
   
  });
  
// General error handler */
  
  app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass error to the next piece of middleware
    return next(err);
  });
  
//  General error handler */
  
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });
  
  
  app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
  });
  




