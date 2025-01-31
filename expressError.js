// The following express error extends from the normal JS error, makes it easier to add errors here
// The error-handling middleware will return this.

class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
  }
  
  module.exports = ExpressError;