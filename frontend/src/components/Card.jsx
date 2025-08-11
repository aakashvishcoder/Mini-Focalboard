import React from 'react';

export default function Card({ card }) {
  return (
    <div className="bg-white rounded p-2 shadow">{card.title}</div>
  );
}
