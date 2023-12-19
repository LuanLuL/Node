// ------------------------------------------------------------------

//                 Creating a HTTP native server

// ------------------------------------------------------------------

// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Hello Word");
//   return response.end();
// });

// server.listen(3333);

// ------------------------------------------------------------------

//                 Creating a HTTP server in memory with fastify

// ------------------------------------------------------------------

// import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
// import { request } from "http";

// const server = fastify();
// const database = new DatabaseMemory();

// // Route is creating a new video
// server.post("/videos", (request, reply) => {
//   const { title, description, duration } = request.body;

//   database.create({
//     title: title,
//     description: description,
//     duration: duration,
//   });

//   return reply.status(201).send(); // status(201) means something was created
// });

// // Route is reading a video
// server.get("/videos", (request) => {
//   const search = request.query.search;
//   const videos = database.list(search);

//   return videos;
// });

// // Route is updating a video
// server.put("/videos/:id", (request, reply) => {
//   const videoId = request.params.id;
//   const { title, description, duration } = request.body;

//   database.update(videoId, {
//     title: title,
//     description: description,
//     duration: duration,
//   });

//   return reply.status(204).send(); //status(204) means sucess, but doesn't has any answer
// });

// // Route is deleting a video
// server.delete("/videos/:id", (request, reply) => {
//   const videoId = request.params.id;
//   database.delete(videoId);

//   return reply.status(204).send(); //status(204) means sucess, but doesn't has any answer
// });

// server.listen({
//   port: 3333,
// });

// ------------------------------------------------------------------

//                 Creating a HTTP online server with fastify

// ------------------------------------------------------------------

import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
import { request } from "http";

const server = fastify();
const database = new DatabasePostgres();

// Route is creating a new video
server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(201).send(); // status(201) means something was created
});

// Route is reading a video
server.get("/videos", async (request) => {
  const search = request.query.search;
  const videos = await database.list(search);

  return videos;
});

// Route is updating a video
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(204).send(); //status(204) means sucess, but doesn't has any answer
});

// Route is deleting a video
server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);

  return reply.status(204).send(); //status(204) means sucess, but doesn't has any answer
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
