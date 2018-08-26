class mPromise {
  constructor(callback) {
    return callback(mPromise.resolve, mPromise.reject);
  }

  static resolve(resolveValue) {
    return {
      then: (callback) => {
        const callbackValue = callback(resolveValue);
        if (callbackValue === undefined) {
          return this.resolve();
        } else {
          return callbackValue;
        }
      },
      catch: (callback) => {
        return callback(resolveValue);
      },
    };
  }

  static reject(rejectValue) {
    return {
      then: (callback) => {
        return callback(rejectValue);
      },
      catch: (callback) => {
        const callbackValue = callback(rejectValue);
        if (callbackValue === undefined) {
          return this.resolve();
        } else {
          return callbackValue;
        }
      },
    };
  }
}

module.exports = mPromise;
