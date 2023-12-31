import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
// import { removeContact, toggleStarredContact } from './store/contactsSlice';
import {
  openEditContactDialog,
  selectContacts,
  openNewContactDialog,
  updateContact,
  openAssignContactDialog,
  openUnassignContactDialog
} from './store/contactsSlice';
import { Button } from '@material-ui/core';
import { DragHandle } from '@material-ui/icons';
import { hasBgRendering } from '@fullcalendar/react';
import VehicleModal from './VehicleModal';
import { removeContact } from './store/contactsSlice';
// import { updateContact } from './store/contactsSlice';

const formatData = vehicles =>
  vehicles.map(vehicle => {
    // const totalCost = `$${(vehicle.serviceCost + vehicle.fuelCost).toLocaleString()}`;
    return {
      ...vehicle,
      isAssigned: vehicle.isAssigned ? 'YES' : 'NO'
      //totalCost
      // millage: vehicle.millage.toLocaleString()
    };
  });

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const [isOpenAddVehicleModal, setIsOpenAddVehicleModal] = useState(false);
  // const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {}, isOpenAddVehicleModal);

  // function handleClick() {
  //   setIsOpenAddVehicleModal(!isOpenAddVehicleModal);
  // }

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map(row => row.original.id);

      //     return selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />;
      //   },
      //   accessor: 'avatar',
      //   Cell: ({ row }) => {
      //     return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
      //   },
      //   className: 'justify-center',
      //   width: 64,
      //   sortable: false
      // },
      {
        Header: 'Assign/Unassign',
        className: 'font-medium',
        Cell: ({ cell }) => {
          // return <button>{cell.row.original.id}</button>;
          return cell.row.original.driver ? (
            <Button variant="contained" onClick={ev => dispatch(openUnassignContactDialog(cell.row.original))}>
              Unassign
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={ev => dispatch(openAssignContactDialog(cell.row.original))}
            >
              Assign
            </Button>
          );
        }
      },
      {
        Header: 'Actions',
        className: 'font-medium',

        Cell: ({ cell }) => {
          return (
            <div>
              <Button variant="contained" onClick={() => dispatch(removeContact(cell.row.original.id))}>
                Delete
              </Button>
              <Button variant="contained" onClick={ev => dispatch(openEditContactDialog(cell.row.original))}>
                Update
              </Button>
            </div>
          );
        }
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Plate Number',
        accessor: 'plate_number',
        sortable: true
      },
      {
        accessor: 'driver.first_name',
        id: 'driver',
        Header: 'Driver',
        className: 'font-medium',
        // sortable: true,
        Cell: ({ cell }) => {
          return (
            <div>
              <span>{cell.row.original?.driver?.first_name} </span>
              <span>{cell.row.original?.driver?.last_name}</span>
            </div>
          );
        }
      }
    ],
    // eslint-disable-next-line
    [dispatch, contacts]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no contacts!
        </Typography>
      </div>
    );
  }

  const formattedData = formatData(filteredData);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      {/* <Button variant="outlined" color="secondary" onClick={() => handleClick()}>
        Add new vehicle{' '}
      </Button> */}
      <Button variant="outlined" color="secondary" onClick={ev => dispatch(openNewContactDialog(ev))}>
        Add new vehicle{' '}
      </Button>
      {/* <VehicleModal open={isOpenAddVehicleModal} handleClick={handleClick} /> */}
      <ContactsTable columns={columns} data={formattedData} />
    </motion.div>
  );
}

export default ContactsList;
