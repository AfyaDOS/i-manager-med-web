import React from 'react';
import { CardFooter } from './styles';
import logoGit from '../../assests/images/git.png';

const Footer: React.FC = () => (
  <CardFooter>
    <h5>© IManagerMED. 2021. Gente é tudo para gente!</h5>
    <div className="git">
      <p>nos siga!</p>
      <img src={logoGit} alt="logo git" className="logoGit" />
    </div>
  </CardFooter>
);

export { Footer };
