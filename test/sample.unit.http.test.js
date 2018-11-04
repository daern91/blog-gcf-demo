const test = require(`ava`);
const sinon = require(`sinon`);
const uuid = require(`uuid`);

const helloHttp = require(`..`).helloHttp;

test(`helloHttp: should print a name`, t => {
  // Mock ExpressJS 'req' and 'res' parameters
  const name = uuid.v4();
  const req = {
    body: {
      name: name
    }
  };
  const res = { send: sinon.stub() };

  // Call tested function
  helloHttp(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [`Hello ${name}!`]);
});

test(`helloHttp: should print hello world`, t => {
  // Mock ExpressJS 'req' and 'res' parameters
  const req = {
    body: {}
  };
  const res = { send: sinon.stub() };

  // Call tested function
  helloHttp(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [`Hello World!`]);
});
