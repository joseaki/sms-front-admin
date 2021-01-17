import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux/store';

interface Props {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  initialState?: any;
}

export default ({ children, initialState }: Props) => {
  const store = Store.config({ initialState });

  // const store = storeConfig({ initialState });
  return <Provider store={store}>{children}</Provider>;
};

// export class ClassWithStaticMethod {
//   static staticProperty = 'sssss';

//   static staticMethod() {
//     this.staticProperty = 'sssd';
//     return 'static method has been called.';
//   }
// }

// console.log(ClassWithStaticMethod.staticProperty);
// // output: "someValue"
// console.log(ClassWithStaticMethod.staticMethod());
// console.log(ClassWithStaticMethod.staticProperty);
