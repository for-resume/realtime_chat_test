import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({
  message: { text, user, id, edited },
  name,
  selectMessage,
  selectedMessageId,
}) => {
  let isSentByCurrentUser = false;

  if (user === name) {
    isSentByCurrentUser = true;
  }

  let messageBoxColor =
    selectedMessageId && selectedMessageId === id ? 'backgroundLighter' : 'backgroundBlue';

  return isSentByCurrentUser ? (
    <div onDoubleClick={() => selectMessage(id)} className="messageContainer justifyEnd">
      <p className="sentText pr-10">{name}</p>
      <div className={`messageBox ${messageBoxColor}`}>
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
      {edited ? <p>[edited]</p> : null}
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {edited ? <p>[edited]</p> : null}
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
