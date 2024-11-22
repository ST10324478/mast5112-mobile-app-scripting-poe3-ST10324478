import React, { createContext, useState, ReactNode } from 'react';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  course: string;
};

type ContentProps = {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
};

export const Content = createContext<ContentProps | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addItem = (item: MenuItem) => {
    setMenuItems((previousItems: MenuItem[]) => [...previousItems, item]);
  };
  
  const removeItem = (id: string) => {
    setMenuItems((previousItems: MenuItem[]) => previousItems.filter(item => item.id !== id));
  };

  return (
    <Content.Provider value={{ items: menuItems, addItem, removeItem }}>
      {children}
    </Content.Provider>
  );
};