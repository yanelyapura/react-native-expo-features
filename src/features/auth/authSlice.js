import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    idToken: "",
    localId: "",
    imageCamera: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { email, idToken, localId } = action.payload;
            state.email = email;
            state.idToken = idToken;
            state.localId = localId;
        },
        clearUser: () => initialState,
        setImageCamera: (state, action) => { 
            state.imageCamera = action.payload;
        },
        setUserLocation: (state, action) => {
            state.userLocation = action.payload; 
        },
    }
});

export const { setUser, clearUser, setImageCamera, setUserLocation } = authSlice.actions;

export default authSlice.reducer;

// Esta acción obtiene los datos del usuario y puede ser útil para otras partes de la aplicación
export const getUser = () => (dispatch, getState) => {
    const { auth } = getState();
    const { email, idToken, localId, imageCamera } = auth;
    dispatch(setUser({ email, idToken, localId }));
    dispatch(setImageCamera(imageCamera));
};
