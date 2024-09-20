// import { createSlice } from "@reduxjs/toolkit";

// const initialState ={
//     token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
// }

// const authSlice= createSlice({
//     name:"auth",
//     initialState:initialState,
//     reducers:{
//         // setSignupData(state, value) {
//         //     state.signupData = value.payload;
//         //   },
//         //   setLoading(state, value) {
//         //     state.loading = value.payload;
//         //   },
//         setToken(state,value){
//             state.token=value.payload
//         }
//     },
// });

// export const {setToken}=authSlice.actions;
// export default authSlice.reducer;  
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            // Save the token in localStorage
            localStorage.setItem("token", action.payload);
        },
        clearToken(state) {
            state.token = null;
            // Remove the token from localStorage
            localStorage.removeItem("token");
        }
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
