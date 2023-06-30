import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, signOut } from "./authAPI";
import { updateUser } from "../user/userApi";

const initialState = {
  loggedInUserToken: null,
  error: null,
  status: "Idle",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData ,{rejectWithValue}) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo,{rejectWithValue}) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
);

// export const updateUserAsync = createAsyncThunk(
//   "user/updateUser",
//   async (updateData) => {
//     const response = await updateUser(updateData);
//     return response.data;
//   }
// );

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error);
    }
  }
);

export const signOutAsynce = createAsyncThunk(
  "user/signOut",
  async (updateData) => {
    const response = await signOut(updateData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // .addCase(loginUserAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(loginUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUser = action.payload;
      // })
      // .addCase(loginUserAsync.rejected, (state, action) => {
      //   state.status = 'idle';
      //   state.error = action.payload;
      // })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.loggedInUser = action.payload;
      // })
      .addCase(signOutAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
