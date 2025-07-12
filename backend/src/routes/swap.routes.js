const express = require('express');
const prisma = require('../prismaClient');
const verifyToken = require('../authmiddleware/verifyToken');

const router = express.Router();

// CREATE Swap Request
router.post('/', verifyToken, async (req, res) => {
  const { toUserId, skillOffered, skillRequested, message } = req.body;

  if (toUserId === req.user.id) {
    return res.status(400).json({ error: "You can't request a swap with yourself." });
  }

  try {
    const swap = await prisma.swapRequest.create({
      data: {
        fromUserId: req.user.id,
        toUserId,
        skillOffered,
        skillRequested,
        message,
      },
    });

    res.status(201).json(swap);
  } catch (err) {
    console.error('Swap creation error:', err);
    res.status(500).json({ error: 'Failed to create swap request' });
  }
});

// GET Sent + Received Swaps
router.get('/', verifyToken, async (req, res) => {
  try {
    const swaps = await prisma.swapRequest.findMany({
      where: {
        OR: [
          { fromUserId: req.user.id },
          { toUserId: req.user.id },
        ],
      },
      include: {
        fromUser: { select: { id: true, name: true, profilePhoto: true } },
        toUser: { select: { id: true, name: true, profilePhoto: true } },
        feedback: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(swaps);
  } catch (err) {
    console.error('Swap fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
});

// UPDATE Swap Status (accept/reject)
router.put('/:id/status', verifyToken, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['ACCEPTED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const swap = await prisma.swapRequest.findUnique({ where: { id } });

    if (!swap) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    // if (swap.toUserId !== req.user.id) {
    //     console.log('Authenticated user:', req.user);
    //     console.log('Swap toUserId:', swap.toUserId);
    //   return res.status(403).json({ error: 'You are not authorized to update this swap' });
    // }

    const updated = await prisma.swapRequest.update({
      where: { id },
      data: { status },
    });

    res.json({ message: `Swap ${status.toLowerCase()}`, swap: updated });
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ error: 'Failed to update swap status' });
  }
});


// DELETE Swap (by creator if still pending)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const swap = await prisma.swapRequest.findUnique({ where: { id } });

    if (!swap || swap.fromUserId !== req.user.id || swap.status !== 'PENDING') {
      return res.status(403).json({ error: 'Cannot delete this swap request' });
    }

    await prisma.swapRequest.update({
      where: { id },
      data: { status: 'DELETED' },
    });

    res.json({ message: 'Swap request deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete swap' });
  }
});

module.exports = router;
