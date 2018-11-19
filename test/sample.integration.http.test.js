const test = require(`ava`);
const Supertest = require(`supertest`);
const id = require("mongoose").Types.ObjectId();

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

test.cb(`createPost: should save a post`, t => {
  const post = {
    title: "The Name of the Wind",
    author: id,
    content:
      "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
    visible: true
  };
  supertest
    .post(`/createPost`)
    .send(post)
    .expect(200)
    .expect(response => {
      t.is(response.text, `Post ${post.title} successfully created!`);
    })
    .end(t.end);
});
