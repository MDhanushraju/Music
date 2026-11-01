import express from 'express';
import { dbRepository } from '../db/repository.js';

export function createAuthRouter() {
  const router = express.Router();

  // Helper to extract user ID from headers or token
  function extractUserId(req) {
    return req.headers['x-user-id'] || req.query.userId || 'usr_dev_1';
  }

  // POST /api/v1/auth/otp/request
  router.post('/otp/request', (req, res) => {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    res.json({
      success: true,
      message: 'OTP sent successfully (Demo code: 123456)',
      phone
    });
  });

  // POST /api/v1/auth/otp/verify - Login
  router.post('/otp/verify', async (req, res) => {
    const { phone, code, role, name } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ success: false, message: 'Phone and code are required' });
    }

    const isDev = (process.env.NODE_ENV || 'development') === 'development';
    const isValid = (isDev && code === '123456') || (process.env.OTP_BYPASS_CODE && code === process.env.OTP_BYPASS_CODE);

    if (isValid) {
      try {
        const user = await dbRepository.verifyUser({ phone, code, role, name });
        const subscriptions = await dbRepository.getSubscriptions(user.id);

        res.json({
          success: true,
          accessToken: `tarang_jwt_${Date.now()}`,
          refreshToken: `tarang_refresh_${Date.now()}`,
          user: {
            ...user,
            subscriptions
          }
        });
      } catch (err) {
        console.error('Error during OTP verification:', err);
        res.status(500).json({ success: false, message: 'Authentication failed' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid OTP verification code' });
    }
  });

  // GET /api/v1/auth/me - Get full user profile from database
  router.get('/me', async (req, res) => {
    const userId = extractUserId(req);
    try {
      const user = await dbRepository.getUserById(userId);
      if (!user) {
        // Return default profile if user not yet created
        return res.json({
          success: true,
          data: {
            id: userId,
            name: 'Alwin Joseph',
            role: 'creator',
            homeCity: 'Bengaluru',
            avatar: 'AJ',
            bio: 'Creator & Audiophile',
            listeningHours: 48.0,
            subscriptions: await dbRepository.getSubscriptions(userId)
          }
        });
      }

      const subscriptions = await dbRepository.getSubscriptions(user.id);
      res.json({
        success: true,
        data: {
          ...user,
          subscriptions
        }
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
    }
  });

  // PATCH /api/v1/auth/me - Update profile, default city, and settings in database
  router.patch('/me', async (req, res) => {
    const userId = extractUserId(req);
    const updates = req.body || {};

    try {
      const updatedUser = await dbRepository.updateUserProfile(userId, updates);
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, data: updatedUser });
    } catch (err) {
      console.error('Error updating user profile:', err);
      res.status(500).json({ success: false, message: 'Failed to update user profile' });
    }
  });

  // POST /api/v1/auth/logout - Record logout timestamp in database
  router.post('/logout', async (req, res) => {
    const userId = req.body?.userId || extractUserId(req);
    try {
      await dbRepository.recordUserLogout(userId);
      res.json({
        success: true,
        message: 'Logged out successfully. Session ended in database.'
      });
    } catch (err) {
      console.error('Logout error:', err);
      res.status(500).json({ success: false, message: 'Error processing logout' });
    }
  });

  // GET /api/v1/auth/me/subscriptions
  router.get('/me/subscriptions', async (req, res) => {
    const userId = extractUserId(req);
    try {
      const subs = await dbRepository.getSubscriptions(userId);
      res.json({ success: true, data: subs });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch subscriptions' });
    }
  });

  return router;
}
