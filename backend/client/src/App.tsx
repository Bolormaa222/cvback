import React from 'react';
import './App.css';
//import {ChakraProvider} from '@chakra-ui/react'

import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home/index'
import Layout from './components/Layout';
import ResumeTemplates from './pages/resume-templates';
import CreateResume from './pages/create-resume';
import CreateResumeIntroduction from './pages/create-resume-introduction';
function App() {
  return (
      <div style={{margin:"0 auto"}}>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage/>}/>
              <Route path="resume-templates" element={<ResumeTemplates/>} />
              <Route path="app/create-resume/introduction" element={<CreateResumeIntroduction/>}/>
              <Route path = "app/create-resume/continue/:id" element={<CreateResume/>}/>
            </Route>
          </Routes>
      </div>
       
  );
}

export default App;
