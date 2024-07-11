import { Link } from 'react-router-dom';
import React from 'react';

interface Props {
  title: string;
  link: string;
}

export const QuestionnaireItem: React.FC<Props> = ({ title, link }) => {
  return (
    <div>
      <Link to={link}>{title}</Link>
    </div>
  );
};
