import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextSearch from './context/ContextSearch.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> <GoogleOAuthProvider clientId='82245430637-abe15q83d3oqmndhpg1i4n919p118hdi.apps.googleusercontent.com'  > 
     <ContextSearch> <App /></ContextSearch>
      </GoogleOAuthProvider></BrowserRouter>
  </StrictMode>,
)
