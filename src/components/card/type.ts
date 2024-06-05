import React from 'react';

export interface DefaultCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  title: string;
}
