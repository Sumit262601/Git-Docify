const express = require('express');
const User = require('../models/User');
const { authenticate, requireAdmin, checkSubscription } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const stats = {
      readmeGenerations: user.usage.readmeGenerations,
      monthlyLimit: user.usage.monthlyLimit,
      remainingGenerations: user.canGenerateReadme() ? 
        (user.subscription.plan === 'lifetime' || user.subscription.plan === 'monthly' ? 'Unlimited' : 
         user.usage.monthlyLimit - user.usage.readmeGenerations) : 0,
      subscription: user.subscription,
      memberSince: user.createdAt
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics.'
    });
  }
});

// @route   POST /api/users/generate-readme
// @desc    Generate README (increment usage)
// @access  Private
router.post('/generate-readme', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.canGenerateReadme()) {
      return res.status(403).json({
        success: false,
        message: 'You have reached your README generation limit. Please upgrade your plan.',
        currentUsage: user.usage.readmeGenerations,
        limit: user.usage.monthlyLimit
      });
    }

    // Increment usage
    await user.incrementUsage();

    // Here you would integrate with your README generation logic
    const readmeContent = `# ${req.body.projectName || 'My Project'}

## Description
This is an auto-generated README file created with GitDocify.

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Contributing
Pull requests are welcome. For major changes, please open an issue first.

## License
[MIT](https://choosealicense.com/licenses/mit/)
`;

    res.json({
      success: true,
      message: 'README generated successfully.',
      readme: readmeContent,
      usage: {
        current: user.usage.readmeGenerations + 1,
        limit: user.usage.monthlyLimit
      }
    });
  } catch (error) {
    console.error('Generate README error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating README.'
    });
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users
// @access  Private/Admin
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users.'
    });
  }
});

module.exports = router;