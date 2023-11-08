import express, { Request, Response } from 'express';

export const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('test');
  try {
    // const user = await authenticateUser(username, password);
    const user = { id: 1, username: 'admin' };
    if (user) {
      // User is authenticated, start the session
      req.session.userId = user.id;
      req.session.authenticated = true; // Save user id or other data in session
      console.log(req.session.userId);
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
