const eventReducer = (
  state: any,
  { type, payload }: { type: string; payload: boolean }
) => {
  switch (type) {
    case "MODAL_LOGIN":
      return {
        ...state,
        login: true,
        signin: false,
      };
    case "MODAL_SIGNIN":
      return {
        ...state,
        signin: true,
        login: false,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        signin: false,
        login: false,
      };

    default:
      return state;
  }
};
export default eventReducer;
