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
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div>{children}</div>
        <Card
          className="flex items-center justify-center w-64"
          style={{ width: 200 }}
        >
          <CardBody>{clock}</CardBody>
        </Card>
        <div style={{ marginTop: 10, width: 200 }}>{todos}</div>
      </div>
    </>
  );
};

export default Layout;
