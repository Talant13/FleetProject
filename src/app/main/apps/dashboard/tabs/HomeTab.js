import { motion } from 'framer-motion';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { useDispatch, useSelector } from 'react-redux';
// import FuseUtils from '@fuse/utils';
import Widget1 from '../widgets/Widget1';
import Widget2 from '../widgets/Widget2';
import Widget3 from '../widgets/Widget3';
import Widget4 from '../widgets/Widget4';
import Widget5 from '../widgets/Widget5';
import Widget8 from '../widgets/Widget8';
import Widget12 from '../widgets/Widget12';
import { useEffect, useState } from 'react';

function HomeTab() {
  // const [data, setData] = useState();
  // const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  console.log(widgets, '<<<<<<<<<<<<');

  // useEffect(() => {
  //   setData(dispatch(getWidgets()));
  // }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4">
      {/* <motion.div variants={item} className="widget flex md:w-1/2 p-12"> */}
      <div className="row-span-1">
        {' '}
        <Widget1 widget={widgets.undefined.drivers} />
      </div>
      {/* </motion.div> */}
      {/* <motion.div variants={item} className="widget flex md:w-1/2  p-12"> */}
      <div className="row-span-1">
        {' '}
        <Widget2 widget={widgets.undefined.issues} />
      </div>
      {/* </motion.div> */}
      {/* <motion.div variants={item} className="widget flex md:w-1/2 h-full p-12"> */}
      <div className="row-span-2  ">
        {' '}
        <Widget3 widget={widgets.undefined.vehicles} />
      </div>
    </div>
  );
}

export default HomeTab;
