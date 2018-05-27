// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

// Routes
import AppRoutes from './routes';

render(
    <Router>
      <AppRoutes />
    </Router>,
  document.getElementById('root')
);
