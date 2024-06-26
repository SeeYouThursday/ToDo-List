'use client';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
// Auth Imports
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthContext } from '../../app/GlobalContext';
// UI Imports
import BeatLoader from 'react-spinners/BeatLoader';
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(user);
    });

    // Clean up the onAuthStateChanged listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BeatLoader />
      </div>
    ); // or your custom loading component
  }
  {
    /*//TODO Future Dev: Make NavItems disappear when the screen is sm*/
  }
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

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
          {user !== null ? (
            <>
              {loading ? (
                <BeatLoader loading={loading} />
              ) : (
                <Link href="/login">Login</Link>
              )}
            </>
          ) : (
            <NavbarItem>
              <Link href="/dashboard">Dashboard</Link>
            </NavbarItem>
          )}
        </NavbarItem>
        <NavbarItem>
          <BeatLoader loading={loading} />
          {user ? null : <Link href="/login">Login</Link>}
        </NavbarItem>
        <NavbarItem>{user !== null ? <LogoutBtn /> : null}</NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={'foreground'}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
