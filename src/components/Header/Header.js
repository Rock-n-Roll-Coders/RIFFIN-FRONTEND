import React from 'react'
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

import HeaderLogo from './HeaderLogo'
import TagInput from './TagInput';
import HeaderLinks from './HeaderLinks';
import AvatarMenu from './AvatarMenu'


const Header = () => {
  const [showUserButtons, setShowUserButtons] = useState(true)
  const { user } = useContext(UserContext)

  return (
    <>
      <HeaderLogo />
      <TagInput />
      <HeaderLinks />
      <AvatarMenu />
    </>
  )
}

export default Header