import React from 'react';
import { SaveButton, Toolbar } from "react-admin";

import  './style.scss';

export default function CustomToolbar(props) {
  return (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
  );
}
