const express = require('express');
const prisma = require('../prismaClient');
const verifyToken = require('../authmiddleware/verifyToken');

const router = express.Router();

// GET /api/users/me
// GET /api/users/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        profilePhoto: true,
        skillsOffered: true,
        skillsWanted: true,
        availability: true,
        isPublic: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});


// PUT /api/users/me
router.put('/me', verifyToken, async (req, res) => {
  const {
    name,
    location,
    profilePhoto,
    skillsOffered,
    skillsWanted,
    availability,
    isPublic
  } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        location,
        profilePhoto,
        skillsOffered,
        skillsWanted,
        availability,
        isPublic
      }
    });

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET /api/users?skill=Photoshop&availability=weekends
router.get('/', async (req, res) => {
  const { skill, availability } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: {
        isPublic: true,
        banned: false,
        skillsOffered: skill ? { has: skill } : undefined,
        availability: availability ? { has: availability } : undefined
      },
      select: {
        id: true,
        name: true,
        location: true,
        profilePhoto: true,
        skillsOffered: true,
        availability: true
      }
    });

    res.json(users);
  } catch (err) {
    console.error('User search error:', err);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// GET /api/users/:id
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || (user.id !== req.user.id && !user.isPublic && !req.user.isAdmin)) {
      return res.status(403).json({ error: 'Not allowed to view this profile' });
    }

    res.json({
      id: user.id,
      name: user.name,
      location: user.location,
      profilePhoto: user.profilePhoto,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      availability: user.availability,
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
