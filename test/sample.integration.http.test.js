const test = require(`ava`);
const Supertest = require(`supertest`);
// const supertest = Supertest(process.env.BASE_URL);
const supertest = Supertest("localhost:8010");

test.cb(`helloHttp: should print a name`, t => {
  supertest
    .post(`/helloHttp`)
    .send({ name: "John" })
    .expect(200)
    .expect(response => {
      t.is(response.text, "Hello John!");
    })
    .end(t.end);
});

test.cb(`helloHttp: should print hello world`, t => {
  supertest
    .get(`/helloHttp`)
    .expect(200)
    .expect(response => {
      t.is(response.text, `Hello World!`);
    })
    .end(t.end);
});
