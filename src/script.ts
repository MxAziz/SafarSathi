// import { v4 as uuid } from "uuid";
// import { prisma } from "./lib/prisma.js";
// import app from "./app.js";

// async function main() {
//   // Create a new user with a post
//   const user = await prisma.user.create({
//     data: {
//       name: "Alice",
//       email: uuid().toString() + "@prisma.io",
//       posts: {
//         create: {
//           title: "Hello World",
//           content: "This is my first post!",
//           published: true,
//         },
//       },
//     },
//     include: {
//       posts: true,
//     },
//   });
//   console.log("Created user:", user);

//   // start server
//   app.listen(process.env.PORT || 3000, () => {
//     console.log('Server started on port 3000');
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });


import { Server } from "http";
import app from "./app.js";
import { prisma } from "./lib/prisma.js";
import config from "./config/index.js";
import { seedAdmin } from "./utils/seedAdmin.js";

let server: Server;

async function startServer() {
  try {
    // 1️⃣ Connect DB
    await prisma.$connect();
    console.log("✅ Database connected");

    // 2️⃣ Seed BEFORE server starts
    await seedAdmin();
    console.log("🌱 Admin seeding completed");

    // 3️⃣ Start server
    server = app.listen(config.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${config.PORT}`);
    });

  } catch (error) {
    console.error("❌ Startup failed:", error);
    process.exit(1);
  }
}

// Global error handlers
process.on("unhandledRejection", (err) => {
  console.error("🚨 Unhandled Rejection:", err);
  shutdown();
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
  shutdown();
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received");
  shutdown();
});

// Graceful shutdown handler
function shutdown() {
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

startServer();
