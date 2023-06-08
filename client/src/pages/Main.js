import React, { useEffect, useState, useMemo } from 'react'
import { Button, TextField, Typography } from "@mui/material";
import '../App.css';


function Main({ socket, room, user, onLogout, online }) {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState(localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages(messages => [data, ...messages])
            console.log('msg recieved.,', data)
        })
        return () => {
            socket.off("receive_message", {});
          };
    }, [socket])

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value.length > 0) {
            const new_message = {
                id: new Date().getTime(), 
                user: user, text: 
                e.target.value, 
                room: room,
                timestamp: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            setMessages(messages => [new_message, ...messages])
            localStorage.setItem('messages', JSON.stringify(messages))
            setValue('')
            var objDiv = document.getElementById("chatbox");
            objDiv.scroll({ bottom: objDiv.scrollHeight, behavior: 'smooth' });

            socket.emit('send_message', new_message)
        }
    }
    
  return (
    <div className='main'>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'}}>
            <Typography variant='subtitle1' fontWeight={600}>{room}</Typography>
            {/* <Typography variant='h4' fontWeight={600}>TGN INNER CIRCLE</Typography> */}
            <Typography variant='subtitle1' fontWeight={600}> {user} 
            <div onClick={onLogout} style={{color: 'skyblue', cursor: 'pointer'}}>logout</div></Typography>
        </div>

        <div className='bottom'>
            <div className='status'>
                <div style={{width: '50%', marginLeft: '30px', textAlign: 'start', marginTop: '20px'}}>
                {
                    online.map(v => (
                        <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                            <div style={{
                                height: '10px', 
                                width: '10px', 
                                border: '1px solid green', 
                                borderRadius: '50%',
                                backgroundColor: 'green',
                                marginRight: '5px'
                            }}></div>
                            <div> {v}</div>
                        </div>
                    ))
                }
                </div>
            </div> 
            <div className='chat'>
                chat
                <div className='chatbox' id='chatbox'>
                    {
                        messages.map((v, i) => (
                            <div key={i}
                                style={{
                                    fontSize: '10px', 
                                    margin: '15px', 
                                    border: '1px solid darkgrey', 
                                    borderRadius: '15px', 
                                    padding: '10px',
                                    alignSelf: v.user === user ? 'end' : 'start', 
                                    width: 'auto',
                                    maxWidth: '60%',
                                }}
                            >
                                <div style={{
                                    display: 'flex', 
                                    textAlign: 'start'
                                }}>
                                <Typography 
                                variant='h6'
                               color={v.user === user ? 'primary' : 'secondary'}
                               style={{marginRight: '5px'}}
                            >{v.user}:</Typography> 
                            <Typography 
                                variant='h6'
                                style={{
                                    textAlign: 'start',
                                    wordBreak: 'break-word'
                                }}
                            > {` ${v.text}`}</Typography>
                                </div>
                                
                                <div style={{margin: '0 5px', color: 'darkgrey', fontSize: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>{v.timestamp}</div>
                                    <div style={{
                                        height: '5px', 
                                        width: '5px', 
                                        border: '1px solid darkgrey', 
                                        borderRadius: '50%',
                                        backgroundColor: 'darkgrey'
                                }}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='input'>
                    <TextField
                        value={value}
                        style={{width: '100%'}}
                        id="filled-multiline-flexible"
                        placeholder="Type a message..."
                        variant="outlined"
                        color='primary'
                        active
                        inputProps={{style: {color: 'white'}}}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        autoComplete='off'
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            outline: '1px solid white',
                            borderRadius: '4px'
                        }}
                    />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Main