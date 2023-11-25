// custom error class for handling database related errors

class DBError extends Error {
  public code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.name = 'CustomDBError';
    this.code = code || 500;
    Object.setPrototypeOf(this, DBError.prototype);
  }
}

export default DBError;
