const { assert } = require('chai');
const mPromise = require('../mpromise');

describe('mPromise', () => {
  it('exists', () => {
    assert.isDefined(mPromise);
  });

  it('is a function', () => {
    assert.equal(typeof mPromise, 'function');
  });

  it('has resolve method', () => {
    assert.isDefined(mPromise.resolve);
  });

  it('has reject method', () => {
    assert.isDefined(mPromise.reject);
  });

  it('resolve method has then method', () => {
    assert.isDefined(mPromise.resolve().then);
  });

  it('resolve method has catch method', () => {
    assert.isDefined(mPromise.resolve().catch);
  });

  it('reject method has then method', () => {
    assert.isDefined(mPromise.reject().then);
  });

  it('reject method has catch method', () => {
    assert.isDefined(mPromise.reject().catch);
  });

  it('then method should have callback with parameter value of the previous resolve method', (done) => {
    mPromise.resolve('a')
      .then((value) => {
        assert.equal(value, 'a');
        done();
      });
  });

  it('the return object of a resolve method call should have a then/catch method', () => {
    const promise = mPromise.resolve('a')
      .then(() => {
        return mPromise.resolve();
      });
    assert.isDefined(promise.then);
    assert.isDefined(promise.catch);
  });

  it('the return object of a catch method call should have a then/catch method', () => {
    const promise = mPromise.reject('a')
      .catch(() => {
        return mPromise.reject();
      });
    assert.isDefined(promise.then);
    assert.isDefined(promise.catch);
  });

  it('reject catch -> resolve then', (done) => {
    const promise = mPromise.reject('a')
      .catch((value) => {
        return mPromise.resolve(value);
      })
      .then((value) => {
        assert.equal(value, 'a');
        done();
      });
  });

  it('resolve then -> reject catch', (done) => {
    const promise = mPromise.resolve('a')
      .then((value) => {
        return mPromise.reject(value);
      })
      .catch((value) => {
        assert.equal(value, 'a');
        done();
      });
  });

  it('return undefined in then should be parsed as resolve', (done) => {
    mPromise.resolve()
      .then(() => {
        // return undefined;
      })
      .then((value) => {
        assert.isUndefined(value);
        done();
      });
  });

  it('return undefined in catch should be parsed as resolve', (done) => {
    mPromise.reject()
      .catch(() => {
        // return undefined;
      })
      .then((value) => {
        assert.isUndefined(value);
        done();
      });
  });

  it('constructor resolve callback', (done) => {
    new mPromise((resolve) => {
      return resolve('a');
    })
      .then((value) => {
        assert.equal(value, 'a');
        done();
      });
  });
  it('constructor resolve callback', (done) => {
    new mPromise((resolve, reject) => {
      return reject('a');
    })
      .then((value) => {
        assert.equal(value, 'a');
        done();
      });
  });

  it.skip('non-promise return value in a then should be wrapped in a promise', (done) => {
    mPromise.resolve()
      .then(() => {
        return 'a';
      })
      .then((value) => {
        assert.equal(value, 'a');
        done();
      });
  });
});
