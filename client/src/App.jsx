import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Editor from './pages/editor';
import Login from './pages/login';
import TestCaseList from './pages/TestCaseList';
import Register from './pages/register';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />               {/* ✅ root là Login */}
      <Route path="/login" element={<Login />} />          {/* ✅ /login cũng là Login */}
      <Route path="/editor" element={<Editor />} />        {/* ✅ editor page */}
      <Route path="/register" element={<Register />} />
      <Route path="/testcaselist" element={<TestCaseList />} /> {/* ✅ danh sách test case */}
    </Routes>
  );
}
