import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import Routes from '../Routes';

import './layout.css';
import Products from "../../pages/Products";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
    const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');
    dispatch(ThemeAction.setMode(themeClass));
    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route
            render={(props) => (
              <>
                <Sidebar {...props} />
                <div className="layout__content">
                  <TopNav />
                  <div className="layout__content-main">
                    <Routes />
                  </div>
                </div>
              </>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
