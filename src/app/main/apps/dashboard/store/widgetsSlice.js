import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('projectDashboardApp/widgets/getWidgets', async () => {
  //const response = await axios.get('/api/project-dashboard-app/widgets');
  const response = await axios.get('https://mysite-h17z.onrender.com/team2/api/dashboard');
  const data = await response;

  return data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgets, selectById: selectWidgetById } = widgetsAdapter.getSelectors(
  state => state.projectDashboardApp.widgets
);

const widgetsSlice = createSlice({
  name: 'projectDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll
  }
});

export default widgetsSlice.reducer;
