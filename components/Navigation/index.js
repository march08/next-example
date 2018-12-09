import React from 'react'

// next stuff
import Link from 'next/link'

// local
import cls from './navigation.scss'

export default () => (
  <div className={ cls.wrapper }>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
)
