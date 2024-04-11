import { shutDown } from '../../index';

export async function shutDownServer(done: jest.DoneCallback) {
  try {
    // Execute async operations
    await shutDown();

    // If there are other asynchronous operations, perform them here
    // For example: await SocketServer.close();

    // Once all async operations are complete, call done()
    done();
  } catch (error) {
    // In case of any errors, you can pass them to done
    done(error);
  }
}
