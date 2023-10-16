import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';

export const getVehicles = createAsyncThunk(
  'vehicle-list-app/vehicles/getContacts',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
    const response = await axios.get('https://mysite-h17z.onrender.com/team2/api/vehicles', {
      params: routeParams
    });
    const data = await response.data.data;

    return { data, routeParams };
  }
);

// export const addVehicle = async vehicleProp => {
//   // console.log(vehicleProp);
//   var myHeaders = new Headers();
//   myHeaders.append('Content-Type', 'application/json');
//   var raw = JSON.stringify(vehicleProp);
//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };
//   fetch('https://mysite-t3la.onrender.com/team2/api/vehicles/', requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
//   getVehicles();
// };

export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.post('https://mysite-h17z.onrender.com/team2/api/vehicles/', contact);
    const data = await response.data;

    dispatch(getVehicles());

    return data;
  }
);

export const assignVehicle = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (car, { dispatch, getState }) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      driver_id: car.driver_id,
      start_date: car.start_date,
      start_odometer: car.start_odometer,
      start_comment: car.start_comment
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://mysite-h17z.onrender.com/team2/api/vehicles/${car.id}/assign`, requestOptions)
      .then(response => response.text())
      .then(result => dispatch(getVehicles()))
      .catch(error => console.log('error', error));

    // const response = await axios.post('https://mysite-h17z.onrender.com/team2/api/assign/', contact);
    // const data = await response.data;

    // dispatch(getVehicles());

    return data;
  }
);

export const unassignVehicle = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (car, { dispatch, getState }) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      assignment_id: car.active_assignment.id,
      assignment: {
        end_odometer: car.ending_odometer,
        end_date: car.updated_at,
        end_comment: car.end_comment
      }
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://mysite-h17z.onrender.com/team2/api/vehicles/${car.id}/unassign`, requestOptions)
      .then(response => response.text())
      .then(result => dispatch(getVehicles()))
      .catch(error => console.log('error', error));

    //dispatch(getVehicles());
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (carId, { dispatch, getState }) => {
    let result = confirm('Are you sure?');
    if (result) {
      var raw = '';

      var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
      };
      fetch(`https://mysite-h17z.onrender.com/team2/api/vehicles/${carId}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      return carId;
    } else {
      return;
    }
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    // console.log(contact.id, '<<<<<<<<<<<<<<<<<<<<<<<');

    const response = await axios.post('https://mysite-h17z.onrender.com/team2/api/vehicles/', contact);
    const data = await response.data;

    dispatch(getVehicles());

    return data;
  }
);

// export const removeContacts = createAsyncThunk(
//   'contactsApp/contacts/removeContacts',
//   async (contactIds, { dispatch, getState }) => {
//     await axios.post('/api/contacts-app/remove-contacts', { contactIds });

//     return contactIds;
//   }
// );

// export const toggleStarredContact = createAsyncThunk(
//   'contactsApp/contacts/toggleStarredContact',
//   async (contactId, { dispatch, getState }) => {
//     const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getContacts());

//     return data;
//   }
// );

// export const toggleStarredContacts = createAsyncThunk(
//   'contactsApp/contacts/toggleStarredContacts',
//   async (contactIds, { dispatch, getState }) => {
//     const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getContacts());

//     return data;
//   }
// );

// export const setContactsStarred = createAsyncThunk(
//   'contactsApp/contacts/setContactsStarred',
//   async (contactIds, { dispatch, getState }) => {
//     const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getContacts());

//     return data;
//   }
// );

// export const setContactsUnstarred = createAsyncThunk(
//   'contactsApp/contacts/setContactsUnstarred',
//   async (contactIds, { dispatch, getState }) => {
//     const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getContacts());

//     return data;
//   }
// );

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
  state => state.contactsApp.contacts
);

const contactsSlice = createSlice({
  name: 'contactsApp/contacts',
  initialState: contactsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    contactDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    },

    assignDialog: {
      type: 'assign',
      props: {
        open: false
      },
      data: null
    },
    unassignDialog: {
      type: 'unassign',
      props: {
        open: false
      },
      data: null
    }
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    },
    openEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    openAssignContactDialog: (state, action) => {
      state.assignDialog = {
        type: 'assign',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeAssignContactDialog: (state, action) => {
      state.assignDialog = {
        type: 'assign',
        props: {
          open: false
        },
        data: null
      };
    },
    openUnassignContactDialog: (state, action) => {
      state.unassignDialog = {
        type: 'unassign',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeUnassignContactDialog: (state, action) => {
      state.unassignDialog = {
        type: 'unassign',
        props: {
          open: false
        },
        data: null
      };
    },
    closeEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [updateContact.fulfilled]: contactsAdapter.upsertOne,
    [addContact.fulfilled]: contactsAdapter.addOne,
    [assignVehicle.fulfilled]: contactsAdapter.addOne,
    [unassignVehicle.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
    //[addVehicle.fulfilled]: vehicleAdapter.addOne,
    // [removeContacts.fulfilled]: (state, action) => contactsAdapter.removeMany(state, action.payload),
    // [getDrivers.fulfilled]: (state, action),
    [removeContact.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
    [getVehicles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    }
  }
});

export const {
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  openAssignContactDialog,
  closeAssignContactDialog,
  openUnassignContactDialog,
  closeUnassignContactDialog
} = contactsSlice.actions;

export default contactsSlice.reducer;
