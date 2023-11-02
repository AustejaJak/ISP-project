import React, { useState } from "react";

// Use useQuery for getting some products based on text query given

const SearchBox = () => {
  const [text, setText] = useState("");

  return (
    <div className='px-3'>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='outline-none rounded-lg pl-2 py-1'
        placeholder='Search for Boots'
      />
    </div>
  );
};

export default SearchBox;
