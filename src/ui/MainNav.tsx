import { NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { memo } from "react";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    ${tw`
      px-[2.4rem] py-[1.2rem]
      text-grey-600 font-medium
      flex items-center gap-[1.2rem] 
      transition duration-300
    `}
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    ${tw`rounded-sm text-grey-800 bg-grey-50`}/* bg-grey-50 */
  }

  & svg {
    ${tw`
        w-[2.4rem] h-[2.4rem]
        text-gray-400
        transition duration-300

    `}/* width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s; */
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    ${tw` text-brand-600`}
  }
`;

const MainNav = memo(function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
});

export default MainNav;
