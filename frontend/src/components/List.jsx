import React, { useState } from 'react';
import Card from './Card';
import { useStore } from '../store';

export default function List({ boardId, list }) {
  const { addCard } = useStore();
  const [newCardTitle, setNewCardTitle] = useState('');

  const onAddCard = () => {
    if (newCardTitle.trim() === '') return;
    addCard(boardId, list.id, newCardTitle);
    setNewCardTitle('');
  };

  return (
    <div className="bg-gray-100 rounded p-3 flex flex-col max-h-[400px]">
      <h3 className="font-semibold mb-3">{list.title}</h3>

      <div className="flex-grow overflow-y-auto space-y-2 mb-3">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New card title"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          className="border rounded p-1 flex-grow"
        />
        <button
          onClick={onAddCard}
          className="bg-purple-600 text-white px-3 rounded"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}
