'use client';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
  Slider,
  CardFooter,
  Divider,
} from '@nextui-org/react';

export default function Home() {
  return (
    <div
      className="flex flex-col lg:justify-center lg:items-center mx-4 space-x-3"
      style={{ height: '80vh', marginLeft: '10%', marginRight: '10%' }}
    >
      <h1 className="name">Do This Or Else</h1>
      <Card
        isBlurred={true}
        className="flex flex-col items-center justify-center mx-6"
      >
        <CardHeader className="flex justify-center items-center subheading">
          Stop Complaining, just do it.
        </CardHeader>
        <div className="mx-6">
          <Divider />
        </div>
        <CardBody className="flex flex-row">
          <p className="md:w-13 md:mx-7 text-9xl" id="hook">
            Tired of being nagged or just not getting anything done? Sign up
            today for a simple reminder to not be a coach potato so you can just
            <em> DO IT.</em>
          </p>{' '}
          <Image
            src="/mad-potato.png"
            width={270}
            alt="female potato mad at male potato on a couch"
          ></Image>
        </CardBody>{' '}
        <div style={{ zIndex: -1 }}></div>
        <CardFooter className="flex flex-col">
          <h2>Do This</h2>
          <Button size="lg">
            <h4>Sign Up Now</h4>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
