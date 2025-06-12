import { clerkClient } from '@clerk/express';
import dotenv from 'dotenv';

dotenv.config();

export const getClerkUsers = async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList();

    const emails = users.data.map(user => user.emailAddresses);
    console.log('User Emails:', emails);

    res.status(200).json({ emails });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Error retrieving Clerk users' });
  }
};
