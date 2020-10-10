import React from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji'

function Message({ message: { user, text }, name }) {
    let isSentByCurrentUser = false;

    const trimedName = name.trim().toLowerCase();

    if (user === trimedName) {
        isSentByCurrentUser = true
    }

    return (
        <div>
            {
                isSentByCurrentUser ?

                    (<div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{trimedName}</p>
                        <div className="messsageBox backgroundBlue">
                            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>) :

                    (<div className="messageContainer justifyStart">
                        
                        <div className="messsageBox backgroundLight">
                            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                        </div>
                        <p className="sentText pl-10">{user}</p>
                    </div>)
            }
        </div>
    )
}

export default Message
