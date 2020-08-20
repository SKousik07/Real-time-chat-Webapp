export const initialState = {
  name: null,
  photoUrl: "",
  id: null,
  about: "",
  usersList: [],
  combinedId: null,
  selectedUser: {},
  isLoading: false,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        name: action.name,
        photoUrl: action.photoUrl,
        id: action.id,
        about: action.about,
      };
    case "SET_USERS_LIST":
      return {
        ...state,
        usersList: [...action.usersList],
      };

    case "SET_COMBINED_ID":
      return {
        ...state,
        combinedId: action.combinedId,
        selectedUser: action.selectedUser,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.loading,
      };
    default:
      return state;
  }
};

export default reducer;
