import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import api from "./services/api";
import React, { ReactNode } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  liked: boolean;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get("/users/?page=2");
  return response.data.data.map((user: User) => ({ ...user, liked: false }));
});

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return { ...response.data.data, liked: false };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) {
        user.liked = !user.liked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        const existingUser = state.users.find(
          (user) => user.id === action.payload.id
        );
        if (!existingUser) {
          state.users.push(action.payload);
        }
      });
  },
});

export const { toggleLike } = userSlice.actions;

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
