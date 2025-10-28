import { Helmet } from 'react-helmet';

import { ReactNode } from 'react';

type PageProps = {
  title: string;
  children: ReactNode;
};

export function Page({ title, children }: PageProps) {
  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}
