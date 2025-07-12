const express = require('express');
const prisma = require('../prismaClient');
const verifyToken = require('../authmiddleware/verifyToken');
const isAdmin = require('../authmiddleware/isAdmin');

const router = express.Router();

// GET /api/admin/users — List all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        banned: true,
        skillsOffered: true,
        skillsWanted: true,
        isPublic: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT /api/admin/users/:id/ban — Ban or unban user
router.put('/users/:id/ban', verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { banned } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { banned },
    });

    res.json({ message: `User ${banned ? 'banned' : 'unbanned'}`, user: updatedUser });
  } catch (err) {
    console.error('Ban error:', err);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

// DELETE /api/admin/skills/:userId/:type — Remove skill from user
router.delete('/skills/:userId/:type', verifyToken, isAdmin, async (req, res) => {
  const { userId, type } = req.params;
  const { skill } = req.body;

  if (!['skillsOffered', 'skillsWanted'].includes(type)) {
    return res.status(400).json({ error: 'Invalid skill type' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedSkills = user[type].filter(s => s !== skill);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { [type]: updatedSkills },
    });

    res.json({ message: 'Skill removed', user: updatedUser });
  } catch (err) {
    console.error('Skill delete error:', err);
    res.status(500).json({ error: 'Failed to remove skill' });
  }
});

// GET /api/admin/stats — View stats
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const [totalUsers, totalSwaps, totalFeedback] = await Promise.all([
      prisma.user.count(),
      prisma.swapRequest.count(),
      prisma.feedback.count(),
    ]);

    res.json({ totalUsers, totalSwaps, totalFeedback });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// POST /api/admin/announce — Broadcast message (mocked)
router.post('/announce', verifyToken, isAdmin, (req, res) => {
  const { message } = req.body;
  console.log(`[ADMIN ANNOUNCEMENT]: ${message}`);
  res.json({ message: 'Announcement sent (simulated)' });
});

module.exports = router;
