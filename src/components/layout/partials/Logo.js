import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';
// import ShrubLogo from '../../../assets/images/bud/logo-default.svg';
import ShrubLogo from '../../../assets/images/bud/logo.png';



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
            width={30}
            height={30} className={'logo'}/>
        </Link>
    </div>
  );
}

export default Logo;