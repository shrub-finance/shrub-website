import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

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
            src={require('../../../assets/images/bud/logo.svg')}
            alt="Shrub"
            width={30}
            height={30} className={'logo'}/>
        </Link>
    </div>
  );
}

export default Logo;