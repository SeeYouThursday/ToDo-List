import { Card, CardBody, CardHeader } from '@nextui-org/react';

const Layout = ({
  children,
  clock,
  todos,
}: {
  children: React.ReactNode;
  clock: React.ReactNode;
  todos: React.ReactNode;
}) => {
  return (
    <>
      {' '}
      <div className="flex flex-col justify-start items-center">
        <div>{children}</div>
        <div className="flex justify-space">
          {todos}
          <Card className="flex items-center justify-center overflow-clip">
            <CardBody className="items-center p-3">{clock}</CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Layout;
