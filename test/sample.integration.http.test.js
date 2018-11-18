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

test.cb(`createAuthor: should save an author`, t => {
  const author = {
    first_name: "Isaac",
    family_name: "Asimov",
    date_of_birth: "1920-01-02"
  };
  supertest
    .post(`/createAuthor`)
    .send(author)
    .expect(200)
    .expect(response => {
      t.is(
        response.text,
        `Author ${author.first_name} ${
          author.family_name
        } successfully created!`
      );
    })
    .end(t.end);
});
