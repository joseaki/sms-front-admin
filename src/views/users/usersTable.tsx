import React, { ReactElement } from 'react';

interface Props {}

export default function UsersTable(props: Props): ReactElement {
  console.log(props);
  return <div>users table</div>;
}
