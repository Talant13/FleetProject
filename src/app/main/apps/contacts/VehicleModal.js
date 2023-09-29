import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { addVehicle } from './store/contactsSlice';
import { useState } from 'react';
// import * as Yup from 'yup';

export default function VehicleModal({ open, handleClick }) {
  const [vehicleProp, setVehicleProp] = useState({
    brand: '',
    model: '',
    manufacture_year: '',
    color: '',
    vehicle_image: '',
    plate_number: '',
    engine_number: '',
    fuel_type: 'diesel',
    active: true
  });

  const handleChange = async e => {
    if (e.target.id) {
      setVehicleProp({ ...vehicleProp, [e.target.id]: e.target.value });
    } else {
      setVehicleProp({ ...vehicleProp, [e.target.name]: e.target.value });
    }
  };

  const resetVehicleProp = () => {
    setVehicleProp({
      brand: '',
      model: '',
      manufacture_year: '',
      color: '',
      vehicle_image: '',
      plate_number: '',
      engine_number: '',
      fuel_type: 'diesel',
      active: true
    });
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Add vehicle</DialogTitle>
        <DialogContent>
          <TextField
            value={vehicleProp.brand}
            autoFocus
            required
            margin="dense"
            id="brand"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={vehicleProp.brand.length < 1}
          />

          <TextField
            autoFocus
            value={vehicleProp.model}
            margin="dense"
            id="model"
            label="Model"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            value={vehicleProp.manufacture_year}
            margin="dense"
            id="manufacture_year"
            label="Year of manufacture (YYYY-MM-DD)"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            value={vehicleProp.color}
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            value={vehicleProp.vehicle_image}
            required
            margin="dense"
            id="vehicle_image"
            label="Vehicle Image"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={vehicleProp.vehicle_image.length < 1}
          />
          <TextField
            autoFocus
            value={vehicleProp.plate_number}
            required
            margin="dense"
            id="plate_number"
            label="Plate Number"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={vehicleProp.plate_number.length < 1}
          />
          <TextField
            autoFocus
            value={vehicleProp.engine_number}
            required
            margin="dense"
            id="engine_number"
            label="Engine Number"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={vehicleProp.engine_number.length < 1}
          />
          <InputLabel id="fuel_type">Fuel Type</InputLabel>
          <Select
            labelId="fuel_type_label"
            id="fuel_type"
            onChange={handleChange}
            autoWidth
            name="fuel_type"
            label="fuel_type_label"
            value={vehicleProp.fuel_type}
          >
            <MenuItem value="gasoline">gasoline</MenuItem>
            <MenuItem value="propane">propane</MenuItem>
            <MenuItem value="diesel">diesel</MenuItem>
            <MenuItem value="natural-gas">natural gas</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              addVehicle(vehicleProp), handleClick(), resetVehicleProp();
            }}
          >
            Submit
          </Button>
          <Button onClick={() => handleClick()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
