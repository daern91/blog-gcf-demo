const test = require(`ava`);
const sinon = require(`sinon`);
const uuid = require(`uuid`);

const helloHttp = require(`..`).helloHttp;
const createAuthor = require(`..`).createAuthor;

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

test(`createAuthor: should print hello world`, t => {
  // Mock ExpressJS 'req' and 'res' parameters
  const req = {
    body: {
      first_name: "Isaac",
      family_name: "Asimov",
      date_of_birth: "1920-01-02"
    }
  };

  const res = { send: sinon.stub() };

  // Call tested function
  createAuthor(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [
    `Author ${req.body.first_name} ${
      req.body.family_name
    } successfully created!`
  ]);
});
