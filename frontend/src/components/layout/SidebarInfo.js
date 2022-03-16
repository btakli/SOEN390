import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';

export const SidebarInfo = [
  {
    title: 'My Dashboard',
    path: "/doctorDashoard",
    icon: <DashboardIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Patients',
    path: '/patientList',
    icon: <PeopleIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Schdeule',
    path: '/schedule',
    icon: <ScheduleIcon />,
    cName: 'nav-text'
  },



];