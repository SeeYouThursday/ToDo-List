'use client';

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Modal,
} from '@nextui-org/react';
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn';
import LoginFlow from '@/components/LoginFlow/LoginFlow';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ['ToDos'];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered={true}
      className="bg-blue-500"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <p className="font-bold text-inherit">Do This Or Else</p> */}
        </NavbarBrand>
      </NavbarContent>
      {/*//!! Check Weather-This for fix to responsiveness of nav menu  */}
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <LoginFlow />
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
        <NavbarItem>
          <LogoutBtn />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color={'foreground'} className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
