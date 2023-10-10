import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';
// import { addContact, closeNewContactDialog } from './store/contactsSlice';

import {
  // removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
  assignVehicle,
  selectDrivers,
  closeAssignContactDialog
} from './store/contactsSlice';
import { Label } from '@material-ui/icons';
import { InputLabel } from '@material-ui/core';

const defaultValues = {
  id: '',
  driver_id: '',
  start_date: '',
  starting_odometer: '',
  start_comment: ''
  //   plate_number: '',
  //   engine_number: '',
  //   fuel_type: 'diesel',
  //   active: true
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  driver_id: yup.string().required('You must enter a name'),
  start_date: yup.string().required('You must enter a name')
  //   starting_odometer: yup.string().required('You must enter a name'),
  //   comments: yup.string().required('You must enter a name')
});

function AssignDialog(props) {
  const dispatch = useDispatch();
  const assignDialog = useSelector(({ contactsApp }) => contactsApp.contacts.assignDialog);
  const [listDrivers, setListDrivers] = useState([]);

  const fetchData = async () => {
    const res = await fetch('https://mysite-h17z.onrender.com/team2/api/drivers');
    const data = await res.json();

    setListDrivers(data.data);
  };
  useEffect(() => {
    fetchData();
    console.log(listDrivers);
  }, [assignDialog.props.open]);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');
  let entrydata = '';

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (assignDialog.type === 'assign' && assignDialog.data) {
      reset({ ...assignDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    // if (assignDialog.type === 'assign') {
    //   reset({
    //     ...defaultValues,
    //     ...assignDialog.data
    //     // id: FuseUtils.generateGUID()
    //   });
    // }
  }, [assignDialog.data, assignDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (assignDialog.props.open) {
      initDialog();
    }
  }, [assignDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return assignDialog.type === 'assign' ? dispatch(closeAssignContactDialog()) : dispatch(closeAssignContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (assignDialog.type === 'assign') {
      // console.log(data);
      dispatch(assignVehicle(data));
      closeComposeDialog();
    }
    // else {
    //   dispatch(updateContact({ ...assignDialog.data, ...data }));
    // }
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...assignDialog.props}
      // onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {assignDialog.type === 'assign' ? 'Assign' : 'Edit Contact'}
          </Typography>
        </Toolbar>
      </AppBar>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <Controller
              control={control}
              name="plate_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="plate_number"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  //   variant="outlined"
                  required
                  fullWidth
                  disabled
                />
              )}
            />
            <Controller
              control={control}
              name="brand"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="brand"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  //   variant="outlined"
                  required
                  fullWidth
                  disabled
                />
              )}
            />
            <Controller
              control={control}
              name="id"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="id"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  //   variant="outlined"
                  required
                  fullWidth
                  disabled
                />
              )}
            />
          </div>

          <div className="flex">
            <InputLabel id="driver_id">Select Driver</InputLabel>
            <Controller
              control={control}
              name="driver_id"
              render={({ field }) => (
                <Select {...field} className="mb-24" id="fuel_type" required>
                  {listDrivers.map(driver => {
                    return (
                      <MenuItem value={driver.id} name="driver_id">
                        {driver.id} {driver.first_name} {driver.last_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="start_date"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="start_date"
                  label="Start date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="start_odometer"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Starting odometer"
                  id="start_odometer"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="start_comment"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Comments"
                  id="start_comment"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {assignDialog.type === 'assign' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default AssignDialog;
