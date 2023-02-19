require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: process.env.PROJECT_ID,
});


fastify.post('/invite', async (request, reply) => {
    const { name, is_coming } = request.body

    if(!name) return reply.code(400).send({reason: "Missing field data"})

    const document = firestore.doc('posts/intro-to-firestore');

    // Enter new data into the document.
    await document.set({
      name,
    });

    return { status: "OK" }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()