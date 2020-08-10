import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import LayersIcon from '@material-ui/icons/Layers';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import Label from '@material-ui/core/InputLabel';
import * as L from 'leaflet';
import axios from 'axios';

import { useContainerContext } from './ContainerContext';
import { SelectTool } from './SelectTool';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function ToolBar() {
  const classes = useStyles();
  const context = useContainerContext();
  const { map } = context.state;

  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, open: open });
  };

  const addLayer = () => {
    axios.get(`http://localhost:3001/layers/vt_plcwa`)
      .then((res: any) => {
        const layers = res.data;
        var myStyle = {
          "color": "#ff7800",
          "weight": 5,
          "opacity": 0.65
        };
        
        L.geoJSON(layers as any, {
            style: myStyle,
            attribution: 'geoJson_data_layer'
        }).addTo(map);
      });
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Data Grabber
          </Typography>
          <SelectTool />
          <IconButton color="inherit" aria-label="layers" onClick={addLayer}>
            <AddIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="layers" onClick={toggleDrawer(true)}>
            <LayersIcon />
          </IconButton>
        </Toolbar>
        <Drawer anchor="right" open={state.open} onClose={toggleDrawer(false)}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <Checkbox color="primary" />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </div>
  );
}
