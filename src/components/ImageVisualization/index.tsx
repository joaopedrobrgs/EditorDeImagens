import React from 'react'
import './styles.scss'
import TelaInicial from './Screens/TelaInicial'
import MenuAberto from './Screens/MenuAberto'

type Props = {
  className: string
}

const ImageVisualization = ({className}: Props) => {
  return (
    <div className={`tw-my-5 ${className}`}>
      <p className='tw-font-bold'>Pré-visualização:</p>
      <div className="tw-flex tw-justify-start">
        <TelaInicial />
        <MenuAberto />
      </div>

    </div>
  )
}

export default ImageVisualization;