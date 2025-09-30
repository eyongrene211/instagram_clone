'use client';

import { ProSidebarProvider } from 'react-pro-sidebar';

export default function ProSidebarWrapper({ children }) {
  return (
    <ProSidebarProvider>
      {children}
    </ProSidebarProvider>
  );
}