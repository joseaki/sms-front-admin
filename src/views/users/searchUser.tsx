import React, { ReactElement } from 'react';

interface Props {}

export default function SearchUser(props: Props): ReactElement {
  console.log(props);
  return <div>search users</div>;
}
