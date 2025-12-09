import express, {} from 'express';
import { prisma } from './lib/prisma';
const app = express();
// middleware
app.use(express.json());
// routes
app.get('/', async (req, res) => {
    // Fetch all users with their posts
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));
    res.json(allUsers);
});
export default app;
//# sourceMappingURL=app.js.map