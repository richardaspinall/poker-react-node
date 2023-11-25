import express, { Request, Response } from 'express';

export const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Log the session ID
  console.log('Session ID:', req.sessionID);

  // Log the session cookie details
  console.log('Session Cookie:', req.session.cookie);
  try {
    // const user = await authenticateUser(username, password);
    const user = { id: 1, username: 'admin' };
    if (user) {
      // User is authenticated, start the session
      req.session.userId = user.id;
      req.session.authenticated = true; // Save user id or other data in session
      // console.log(req.session);
      // console.log(req.session.authenticated);
      res.status(200).send('Logged in successfully.');
    } else {
      // Authentication failed
      res.status(401).send('Invalid username or password.');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

export default router;
