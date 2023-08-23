import React from 'react'
import './styles.scss'
import ScreenLogin from './Screens/ScreenLogin'
import ScreenMenuAberto from './Screens/ScreenMenuAberto'

type Props = {
  className: string
}

const ImageVisualization = ({className}: Props) => {
  return (
    <div className={`tw-my-5 ${className}`}>
      <p className='tw-font-bold'>Pré-visualização:</p>
      <div className="tw-flex tw-justify-start">
        <ScreenLogin />
        <ScreenMenuAberto />
      </div>

    </div>
  )
}

export default ImageVisualization;