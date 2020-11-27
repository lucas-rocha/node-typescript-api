declare namespace NodeJS {
  //https://stackoverflow.com/a/51114250
  interface Global {
    testRequest: import('supertest').SuperTest<import('supertest').Test>
  }
}