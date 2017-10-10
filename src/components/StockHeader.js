import React from 'react';

export const StockHeader = (props) => {
  const { name } = props;
  return (
    <div style={containerStyle}>
      <div style={nameStyle}>{name}</div>
    </div>
  )
};

const containerStyle = {
  marginBottom: 5
};

const nameStyle = {
  color: 'blue'
};