import { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [likes, setLikes] = useState(248);
  const [shares, setShares] = useState(36);
  const [comments, setComments] = useState([
    { id: 1, text: "Me gustan mucho los postres", replies: [] },
    { id: 2, text: "Pasame la receta", replies: [] }
  ]);

  return (
    <PostContext.Provider value={{ likes, setLikes, shares, setShares, comments, setComments }}>
      {children}
    </PostContext.Provider>
  );
};
