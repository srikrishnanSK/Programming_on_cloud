let initState = {
  loading: false,
};

export const tableReducer = (state = initState, actions) => {
  switch (actions.type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "RESET_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return { ...state };
    }
  }
};
