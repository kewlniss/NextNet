import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);
  const [ message, setMessage ] = useState('');

  // turn this into async function
  useEffect(() => {

    const fetchApi = async () => {

      const response = await fetch('/api/echo');
      setMessage(await response.text());
      console.log('message', message);
    }

    const c = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 500);

    fetchApi();

    return () => clearInterval(c);
  }, []);


  return (
    <div className="container">
      <h1>Home</h1>

      This is a fully-functional Next.js app, check out this counter: {counter}

      <h2>{message}</h2>

      <h1>Other pages:</h1>
      <ul>
        <li><Link href="/post/1">Post 1</Link></li>
        <li><Link href="/post/2">Post 2</Link></li>
      </ul>
    </div>
  )
}

export default Home;
