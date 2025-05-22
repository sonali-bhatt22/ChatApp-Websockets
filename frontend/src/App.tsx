import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoomJoinPage from './RoomJoinPage'
import ChatRoom from './ChatRoom'

const App = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
       <Routes>
        <Route path='/' element={<RoomJoinPage/>}/>
        <Route path='/chat/:roomId' element={<ChatRoom/>}/>
       </Routes>
    </div>
  )
}

export default App
