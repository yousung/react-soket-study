import {useEffect, useState} from "react";

const Connect = () => {
    const [server, setServer] = useState("");
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [isConnect, setIsConnect] = useState(false);

    const connect = () => {
        const ws = new WebSocket(`ws://${server}`);

        ws.onopen = () => {
            setIsConnect(true);
            console.log('connect to server');
        }

        ws.onclose = () => {
            console.log('Disconnected from server');
        };

        ws.onerror = (err) => {
            console.log(err);
        }

        setSocket(ws);
    }

    useEffect(() => {
        return () => {
            // if (socket != null) ws.close;
        }
    }, [])


    const sendMessage = () => {
        socket.send(message);
        setMessage("");
    }

    return (
        <>
            {
                isConnect ? (
                        <div>
                            <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                            <button onClick={sendMessage}>메시지 전송</button>
                        </div>
                    ) :
                    (
                        <div>
                            <div>
                                <input type="text" placeholder="server host 입력"
                                       value={server}
                                       onChange={e => setServer(e.target.value)}/>
                            </div>
                            <button onClick={connect}>연결</button>
                        </div>
                    )
            }
        </>
    )
}

export default Connect;