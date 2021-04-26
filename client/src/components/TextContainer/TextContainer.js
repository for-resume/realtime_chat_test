import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>
        Realtime Chat Приложение{' '}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2>Created with React, Express, Node and Socket.IO</h2>
    </div>
    <div>
      <h2>Чтобы изменить или удалить отправленное сообщение</h2>
      <h2> - дважды кликните на него.</h2>
      <h2>Если вы его полностью сотрёте, то оно удалится.</h2>
    </div>
    {users ? (
      <div>
        <h1>В чате:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
