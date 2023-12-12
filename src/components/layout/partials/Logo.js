import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';
import ShrubLogo from '../../../assets/images/bud/logo-default.svg';



const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
        <Link to="/">
          <Image
            src={ShrubLogo}
            alt="Shrub"
            className={'logo'}/>
        </Link>
    </div>
  );
}

export default Logo;