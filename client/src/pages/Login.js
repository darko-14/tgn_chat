import * as React from "react"
import '../App.css';
import TextField from '@mui/material/TextField';
import { useState } from "react";
function Login({onLogin}) {
    const [value, setValue] = useState('')

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value.length > 2) {
            onLogin(value)
        }
    }
    
    

  return (
    <div className="center">
        <TextField
          value={value}
          style={{width: '300px'}}
          id="filled-multiline-flexible"
          placeholder="Enter you name and hit enter"
          variant="outlined"
          color='primary'
          active
          inputProps={{style: {color: 'white', border: '1px solid white', borderRadius: '7px'}}}
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
          }}
        />        
    </div>
  )
}

export default Login