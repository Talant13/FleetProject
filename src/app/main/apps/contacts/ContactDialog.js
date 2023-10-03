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
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';
// import { addContact, closeNewContactDialog } from './store/contactsSlice';

import {
  // removeContact,
  // updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog
} from './store/contactsSlice';

const defaultValues = {
  brand: '',
  model: '',
  manufacture_year: '',
  color: '',
  image_url: '',
  plate_number: '',
  engine_number: '',
  fuel_type: 'diesel',
  active: true
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  brand: yup.string().required('You must enter a name'),
  plate_number: yup.string().required('You must enter a name'),
  engine_number: yup.string().required('You must enter a name'),
  image_url: yup.string().required('You must enter a name'),
  fuel_type: yup.string().required('You must enter a name')
});

function ContactDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data
        // id: FuseUtils.generateGUID()
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      console.log(data);
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
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
      {...contactDialog.props}
      // onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'new' ? 'New Vehicle' : 'Edit Contact'}
          </Typography>
        </Toolbar>
        {/* <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src="#" />
          {contactDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div> */}
      </AppBar>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div> */}
            <Controller
              control={control}
              name="brand"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Brand"
                  id="brand"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Model" id="model" variant="outlined" fullWidth />
              )}
            />
          </div>

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Phone" id="phone" variant="outlined" fullWidth />
              )}
            />
          </div> */}

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Email" id="email" variant="outlined" fullWidth />
              )}
            />
          </div> */}

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div>
            <Controller
              control={control}
              name="company"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Company" id="company" variant="outlined" fullWidth />
              )}
            />
          </div> */}

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Job title"
                  id="jobTitle"
                  name="jobTitle"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div> */}

          <div className="flex">
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div> */}
            <Controller
              control={control}
              name="manufacture_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="manufacture_year"
                  label="Manufacture year"
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
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div> */}
            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Color" id="color" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div> */}
            <Controller
              control={control}
              name="plate_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Plate Number"
                  id="plate_number"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div> */}
            <Controller
              control={control}
              name="engine_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Engine number"
                  id="engine_number"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div> */}
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Image"
                  id="image_url"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="fuel_type"
              render={({ field }) => (
                <Select {...field} className="mb-24" id="fuel_type" required>
                  <MenuItem value="gasoline" selected>
                    Gasoline
                  </MenuItem>
                  <MenuItem value="diesel">Diesel</MenuItem>
                  <MenuItem value="natural_gas">Natural Gas</MenuItem>
                  <MenuItem value="propane">Propane</MenuItem>
                </Select>
              )}
            />
          </div>

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Notes"
                  id="notes"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />
          </div> */}
        </DialogContent>

        {contactDialog.type === 'new' ? (
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

export default ContactDialog;
