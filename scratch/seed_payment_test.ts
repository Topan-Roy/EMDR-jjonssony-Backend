import mongoose from 'mongoose';
import { User } from '../src/modules/auth/auth.model';
import { SubscriptionPlan, SubscriptionPlanType } from '../src/modules/subscriptions/subscription.model';
import { env } from '../src/config/env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function seed() {
  await mongoose.connect(env.DATABASE_URL);
  console.log('Connected to DB');

  // 1. Create Test Plan
  let plan = await SubscriptionPlan.findOne({ name: 'Test Premium Plan' });
  if (!plan) {
    plan = await SubscriptionPlan.create({
      name: 'Test Premium Plan',
      type: SubscriptionPlanType.PREMIUM,
      price: 120,
      currency: '£',
      interval: 'monthly',
      description: 'A plan for testing payments',
      tagline: 'Test with ease',
      features: ['Feature 1', 'Feature 2'],
      isActive: true
    });
    console.log('Created Test Plan:', plan._id);
  } else {
    console.log('Test Plan already exists:', plan._id);
  }

  // 2. Create Test User
  let user = await User.findOne({ email: 'testpayer@example.com' });
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  if (!user) {
    user = await User.create({
      firstName: 'Test',
      lastName: 'Payer',
      email: 'testpayer@example.com',
      password: hashedPassword,
      authProvider: 'email',
      isVerified: true,
      isProfileCompleted: true,
      role: 'user',
      isAcceptPrivacyStatement: true
    });
    console.log('Created Test User:', user._id);
  } else {
    console.log('Test User already exists:', user._id);
  }

  // 3. Generate Token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  console.log('\n--- TEST DATA ---');
  console.log('Plan ID:', plan._id);
  console.log('User Email: testpayer@example.com');
  console.log('User Password: password123');
  console.log('Auth Token (JWT):', token);
  console.log('-----------------\n');

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
