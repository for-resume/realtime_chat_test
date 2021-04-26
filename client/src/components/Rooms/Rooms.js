import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import queryString from 'query-string';

import './Rooms.css';

const Rooms = ({ location }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);
  }, []);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">{name}</h1>
        <div>
          <p className="joinRoomP">Выбери комнату:</p>
        </div>
        <div>
          <Link to={`/chat?name=${name}&room=important`}>
            <button className="button">ВАЖНОЕ</button>
          </Link>
        </div>
        <div>
          <Link to={`/chat?name=${name}&room=flood`}>
            <button className="button mt-20">ФЛУД</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
