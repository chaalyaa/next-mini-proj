// import '@/styles/globals.css'
import '@/src/assets/sass/main.scss' 

import { SessionProvider, getSession } from 'next-auth/react'

function App(props){
  let { Component, session, pageProps } = props;

  console.log(`[Session]\n${"-".repeat(4)}\n`, props)
  return (
    <SessionProvider session={session}>
        <Component {...pageProps}/>
    </SessionProvider>
  )
}

App.getInitialProps = async({Component,ctx}) =>{
  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const session = await getSession(ctx);

  return {
    pageProps: {
      ...pageProps,
      session,
    }
  }
}

export default App;
