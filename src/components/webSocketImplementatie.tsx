import React, {useEffect} from "react"
import {w3cwebsocket as W3CWebSocket} from "websocket"

export default function WebSocketImplementatie(props: {}){
    const client = new W3CWebSocket("ws:/localhost:8080")

    useEffect(() => {
        client.onopen = () => {
            const subscribeCall = {
                event: "subscribe",
                data: {
                    from: "TestUser",
                    text: "TestMessage",
                }
            }
        }

        // @ts-ignore
        client.onmessage() = (message: { data: string }) => {
            const reply = JSON.parse(message.data)
            console.log(reply)
        }
    },[])

    function onSendButtonClicked(value: string){
        client.send(JSON.stringify({
            from: "TestUser",
            text: value,
        }))
    }

    function onConnectButtonClicked(){
        client.onopen()
    }

    function onDisconnectButtonClicked(){
        client.close()
    }


    return (
        <div>
            <ul>
                <li><button onClick={() => onSendButtonClicked("Hello")}>Send TestMessage</button></li>
                <li><button onClick={() => onConnectButtonClicked()}>Connect</button></li>
                <li><button onClick={() => onDisconnectButtonClicked()}>Disconnect</button></li>
                <li><input type="text" name="inputText"/></li>
            </ul>
        </div>
    )
}
