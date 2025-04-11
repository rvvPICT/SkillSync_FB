import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchProjects, 
  fetchPublicProjects, 
  fetchUserProjects,
  fetchUserPublicProjects
} from '../../services/projects_api';

// Async thunks
export const fetchUserProjectsThunk = createAsyncThunk(
  'projects/fetchUserProjects',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchUserProjects(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublicProjectsThunk = createAsyncThunk(
  'projects/fetchPublicProjects',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPublicProjects();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPublicProjectsThunk = createAsyncThunk(
  'projects/fetchUserPublicProjects',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchUserPublicProjects(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    userProjects: [],
    publicProjects: [],
    userPublicProjects: [],
    currentProject: null,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearProjectError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // User projects
      .addCase(fetchUserProjectsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload || [];
      })
      .addCase(fetchUserProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Public projects
      .addCase(fetchPublicProjectsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.publicProjects = action.payload || [];
      })
      .addCase(fetchPublicProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // User public projects
      .addCase(fetchUserPublicProjectsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPublicProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userPublicProjects = action.payload || [];
      })
      .addCase(fetchUserPublicProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentProject, clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;