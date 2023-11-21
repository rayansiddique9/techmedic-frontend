import React from 'react'

const RichTextField = ({string}) => {
  return (
    <span dangerouslySetInnerHTML={{__html: string}} className='text-[#13a388]' /> 
  )
}

export default RichTextField;