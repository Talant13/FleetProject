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

import { closeUnassignContactDialog, unassignVehicle } from './store/contactsSlice';
import { Label } from '@material-ui/icons';
import { InputLabel } from '@material-ui/core';

const defaultValues = {
  assignment_id: '',
  car_id: '',
  ending_odometer: '',
  end_comment: ''
  //   plate_number: '',
  //   engine_number: '',
  //   fuel_type: 'diesel',
  //   active: true
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  ending_odometer: yup.string().required('You must enter a name')
});

function UnassignDialog(props) {
  const dispatch = useDispatch();
  const unassignDialog = useSelector(({ contactsApp }) => contactsApp.contacts.unassignDialog);
  const [listDrivers, setListDrivers] = useState([]);

  const fetchData = async () => {
    const res = await fetch('https://mysite-h17z.onrender.com/team2/api/drivers');
    const data = await res.json();

    setListDrivers(data.data);
  };
  useEffect(() => {
    fetchData();
    // console.log(listDrivers);
  }, [unassignDialog.props.open]);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (unassignDialog.type === 'unassign') {
      reset({ ...unassignDialog.data });
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
  }, [unassignDialog.data, unassignDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (unassignDialog.props.open) {
      initDialog();
    }
  }, [unassignDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return unassignDialog.type === 'unassign'
      ? dispatch(closeUnassignContactDialog())
      : dispatch(closeUnassignContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (unassignDialog.type === 'unassign') {
      // console.log(data);
      dispatch(unassignVehicle(data));
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
      {...unassignDialog.props}
      // onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {unassignDialog.type === 'unassign' ? 'Unassign' : 'Unassign'}
          </Typography>
        </Toolbar>
      </AppBar>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <Controller
              control={control}
              name="ending_odometer"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Ending odometer"
                  id="ending_odometer"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="end_comment"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Comments"
                  id="end_comment"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

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
      </form>
    </Dialog>
  );
}

export default UnassignDialog;
