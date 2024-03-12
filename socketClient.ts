import { io } from 'socket.io-client';

const signIn = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'eliearo123@gmail.com',
        password: 'helloworld',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const { userId, token } = await response.json();
    connectToSocket(userId, token);
  } catch (error: any) {
    console.error('Sign-in failed:', error.message);
  }
};

const connectToSocket = (userId: string, token: string) => {
    const socket = io('http://localhost:3000', {
      auth: {
        token,
      },
    });
  
    socket.on('connect', () => {
      console.log('Connected to the server!');
      socket.emit('joinRoom', userId);
   
  
      socket.on(userId, ({ complaintId, newStatus }) => {
        console.log(`Complaint ${complaintId} status updated to ${newStatus}`);
      });
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
  };
  
signIn();
