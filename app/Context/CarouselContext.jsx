import {useLoaderData} from '@remix-run/react';
import React, {createContext, useContext, useState} from 'react';

// Step 1: Create a new context
const MyContext = createContext();

// Step 2: Create a custom provider component
export function MyContextProvider({children}) {
  // const {product} = useLoaderData();
  //   const {media} = product;
  const product = '';

  // Step 3: Provide the context value to child components
  return <MyContext.Provider value={{product}}>{children}</MyContext.Provider>;
}

// Step 4: Create a custom useContext hook
export function useMyContext() {
  return useContext(MyContext);
}

// Step 5: Use the custom context in your components
