const userReducer = (
  state: any,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "VALID_USER":
      return {
        ...state,
        isLogin: true,
        data: payload,
      };
    case "INVALID_USER":
      return {
        ...state,
        isLogin: false,
        data: null,
      };

    default:
      return state;
  }
};
export default userReducer;
