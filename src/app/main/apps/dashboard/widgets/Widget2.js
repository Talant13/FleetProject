import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { memo, useState } from 'react';

function Widget2(props) {
  const [currentRange, setCurrentRange] = useState(props.widget.currentRange);

  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
  }

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-start">
      <div className="flex items-center justify-between px-4 pt-8"></div>
      <div className="flex justify-between py-12">
        <Typography className="text-72 font-semibold leading-none text-green tracking-tighter">
          {props.widget.open}
        </Typography>
        <h3>Open</h3>
        <Typography className="text-72 font-semibold leading-none text-red tracking-tighter">
          {props.widget.overdue}
        </Typography>
        <h3>Overdue</h3>
      </div>
      {/* <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium" color="textSecondary">
        <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count[currentRange]}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(Widget2);
