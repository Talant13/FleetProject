import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { memo } from 'react';

function Widget3(props) {
  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-start">
      {/* <div className="flex items-center justify-between px-4 pt-8"></div> */}
      <div className="flex justify-between flex-wrap gap-0.5 ">
        <div>
          <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
            {props.widget.assigned}
          </Typography>
          <h3>Assigned</h3>
        </div>
        <div>
          <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
            {props.widget.unassigned}
          </Typography>
          <h3>Unassigned</h3>
        </div>
        <div>
          {' '}
          <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
            {props.widget.active}
          </Typography>
          <h3>Active</h3>
        </div>
        <div>
          <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
            {props.widget.archived}
          </Typography>
          <h3>Archived</h3>
        </div>
      </div>
      {/* <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium" color="textSecondary">
        <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count[currentRange]}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(Widget3);
