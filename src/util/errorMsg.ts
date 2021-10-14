import axios from "axios";
import { AxiosError } from "axios";

const returnError = (err: Error | AxiosError | unknown) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data.message;
  }

  return "an error occured";
};
export default returnError;
