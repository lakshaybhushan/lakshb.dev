import React from 'react'
import Link from 'next/link'
const Menu = () => {
  return (
    <nav className='text-right flex flex-col gap-y-1.5'>
        <Link href="/projects">Projects</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/contact">Contact</Link>
    </nav>
  )
}

export default Menu