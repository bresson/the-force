/**
 * Top level catch for Promise based errors
 * Use this to propagate errors to user views or logging
 * ** ADAPATION OF SCRIPT FOUND ONLINE AND USED IN SEVERAL OF MY PROJECTS
 */
export class AsyncError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;

    this.errorCode = errorCode;
    if (errorCode === 401 || errorCode === 403) {
      if (!message) {
        this.message = "Invalid username or password";
      } else {
        this.message = message;
      }
    } else {
      this.message = `Network error ${errorCode} : Please contact Admin`;
    }
  }
}

/**
 *
 * @param {*} ErrorHandler
 * Bottom layer of try catch and act as a controller to throw or catch
 * Should wrap an async / await block and reduce boilerplate pollution
 * For now, just throw and catch everything with class AsyncError
 */
export const tryCatch = ErrorHandler => async apiConnect => {
  try {
    return await apiConnect;
  } catch (error) {
    console.error("ERROR ", error);
    throw new ErrorHandler(error.response.status, error.response.data.detail);
  }
};
