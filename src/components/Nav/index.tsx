import React, { useEffect, useState } from 'react';
import {
  Nav as FluentNav,
  INavStyles,
  INavLinkGroup,
  INavLink,
} from '@fluentui/react/lib/Nav';
import { useHistory, useLocation } from 'react-router-dom';
import { open } from '../../utils';

const navStyles: Partial<INavStyles> = {
  root: {
    width: 'auto',
    height: '100vh',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: '/',
        key: '/',
        iconProps: { iconName: 'Home' },
      },
      {
        name: 'Usuários',
        url: 'user',
        key: '/user',
        iconProps: { iconName: 'Telemarketer' },
      },
      {
        name: 'Pacientes',
        url: 'clients',
        key: '/client',
        iconProps: { iconName: 'Contact' },
      },
      {
        name: 'Especialistas',
        url: 'specialists',
        key: '/specialist',
        iconProps: { iconName: 'Medical' },
      },
      {
        name: 'Prontuarios',
        url: 'history',
        key: '/history',
        iconProps: { iconName: 'DocumentSet' },
      },
    ],
  },
];

const Nav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedkey, setSelectedKey] = useState('/');

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.state]);

  function handleNavigate(e?: React.MouseEvent<HTMLElement, MouseEvent>, item?: INavLink) {
    e?.preventDefault();
    history.push(String(item?.key));
    open();
  }

  return (
    <FluentNav
      selectedKey={selectedkey}
      onLinkClick={(e, item) => handleNavigate(e, item)}
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

export { Nav };
