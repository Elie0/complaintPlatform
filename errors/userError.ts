class invalidRefreshToken extends Error {
    statusCode: number;
  
    constructor(message = 'Invalid Refresh Token!') {
      super(message);
      this.name = 'InvalidRefreshToken';
      this.statusCode = 409;
    }
  }
  
  export default invalidRefreshToken;
  