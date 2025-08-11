import create from 'zustand';

const API = 'http://localhost:5000';

export const useStore = create(set => ({
  boards: [],
  loading: false,
  error: null,

  fetchBoards: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${API}/boards`);
      const boards = await res.json();
      set({ boards, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addBoard: async (title) => {
    const res = await fetch(`${API}/boards`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ title }),
    });
    const board = await res.json();
    set(state => ({ boards: [...state.boards, board] }));
  },

  addList: async (boardId, title) => {
    const res = await fetch(`${API}/boards/${boardId}/lists`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ title }),
    });
    const list = await res.json();
    set(state => ({
      boards: state.boards.map(b => {
        if (b.id === boardId) {
          return { ...b, lists: [...b.lists, list] };
        }
        return b;
      }),
    }));
  },

  addCard: async (boardId, listId, title) => {
    const res = await fetch(`${API}/boards/${boardId}/lists/${listId}/cards`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ title }),
    });
    const card = await res.json();
    set(state => ({
      boards: state.boards.map(b => {
        if (b.id === boardId) {
          return {
            ...b,
            lists: b.lists.map(l => {
              if (l.id === listId) {
                return { ...l, cards: [...l.cards, card] };
              }
              return l;
            }),
          };
        }
        return b;
      }),
    }));
  },
}));
