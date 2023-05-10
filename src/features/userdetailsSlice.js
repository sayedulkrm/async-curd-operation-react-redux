import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://645a23b065bd868e9312083e.mockapi.io/reduxcurd";

// We are creating users here. ACTION -> "Method : POST"
export const createUser = createAsyncThunk(
    "users/add",
    async (data, { rejectWithValue }) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, options);

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

// Creating Read Action. Method : GET

export const getAllUsers = createAsyncThunk(
    "users/getall",
    async (args, { rejectWithValue }) => {
        const response = await fetch(url);
        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Delete user

export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id, { rejectWithValue }) => {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Update Users

export const updateUser = createAsyncThunk(
    "users/update",
    async (data, { rejectWithValue }) => {
        const response = await fetch(`${url}/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Slice users

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        isLoading: false,
        users: [],
        error: null,
        searchUser: [],
    },

    reducers: {
        searchUser: (state, action) => {
            state.searchUser = action.payload;
        },
    },
    extraReducers: {
        //////////////////////// Create  ////////////////////////

        [createUser.pending]: (state) => {
            state.isLoading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users.push(action.payload);
        },
        [createUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /////////////////////////// READ ACTION ///////////////////////////

        [getAllUsers.pending]: (state) => {
            state.isLoading = true;
        },

        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        ////////////////////////////// UPDATE ACTION //////////////////////////

        [updateUser.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
        },
        [updateUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //////////////////////////////// DELETE ACTION ////////////////////////////////

        [deleteUser.pending]: (state) => {
            state.isLoading = true;
        },

        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter(
                (user) => user.id !== action.payload.id
            );
        },
        [deleteUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { searchUser } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
