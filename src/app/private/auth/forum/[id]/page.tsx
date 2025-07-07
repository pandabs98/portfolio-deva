import React from 'react'

const page = async ({params}) => {
    const slug = await params
  return (
    <div>{params.id}</div>
  )
}

export default page