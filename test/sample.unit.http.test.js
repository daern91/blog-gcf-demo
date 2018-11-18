const test = require(`ava`);
const sinon = require(`sinon`);
const uuid = require(`uuid`);
const id = require("mongoose").Types.ObjectId();

const helloHttp = require(`..`).helloHttp;
const createAuthor = require(`..`).createAuthor;
const createPost = require(`..`).createPost;

test(`helloHttp: should print a name`, async t => {
  // Mock ExpressJS 'req' and 'res' parameters
  const name = uuid.v4();
  const req = {
    body: {
      name: name
    }
  };
  const res = { send: sinon.stub() };

  // Call tested function
  await helloHttp(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [`Hello ${name}!`]);
});

test(`helloHttp: should print hello world`, async t => {
  // Mock ExpressJS 'req' and 'res' parameters
  const req = {
    body: {}
  };
  const res = { send: sinon.stub() };

  // Call tested function
  await helloHttp(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [`Hello World!`]);
});

test(`createAuthor: should print created author`, async t => {
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
  await createAuthor(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [
    `Author ${req.body.first_name} ${
      req.body.family_name
    } successfully created!`
  ]);
});

test(`createPost: should print created post`, async t => {
  // Mock ExpressJS 'req' and 'res' parameters
  const req = {
    body: {
      title: "The Name of the Wind",
      author: id,
      content:
        "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
      visible: true
    }
  };
  const res = { send: sinon.stub() };

  // Call tested function
  await createPost(req, res);

  // Verify behavior of tested function
  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [
    `Post ${req.body.title} successfully created!`
  ]);
});
