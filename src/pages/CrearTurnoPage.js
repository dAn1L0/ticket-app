import { Button, Col, Row, Typography } from 'antd'
import Icon from '@ant-design/icons';
import React, { useContext, useState } from 'react'
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';

const {Title, Text} = Typography

const HandPressSvg = () => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" fill="currentColor">
    <path
    d="M22 43c-4.7258-1.7673-8.6675-7.8149-10.6403-11.3572-.8518-1.5294-.4031-3.4081.9639-4.5017 1.5237-1.2189 3.7202-1.0973 5.1.2825L19 29V17.5c0-1.3807 1.1193-2.5 2.5-2.5s2.5 1.1193 2.5 2.5v6c0-1.3807 1.1193-2.5 2.5-2.5s2.5 1.1193 2.5 2.5v2c0-1.3807 1.1193-2.5 2.5-2.5s2.5 1.1193 2.5 2.5v2c0-1.3807 1.1193-2.5 2.5-2.5s2.5 1.1193 2.5 2.5v7.868c0 1.0703-.2646 2.128-.8815 3.0027C37.0949 39.8219 35.255 42.0336 33 43c-3.5 1.5-6.6299 1.6343-11 0Z"
    fill="#FFA42E"
    stroke="#000"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M29 12c0-4.41828-3.5817-8-8-8s-8 3.58172-8 8c0 .6906.0875 1.3608.252 2m0 0c.0883.3428.1986.6766.3295 1l-.3295-1Z"
    stroke="#000"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  </svg>
)

const HandPressIcon = (props) => <Icon component={HandPressSvg} {...props} />;

export const CrearTurnoPage = () => {

  useHideMenu(true)

  const {socket} = useContext(SocketContext)
  const [ticket, setTicket] = useState(null)

  const nuevoTurno = () => {
    
    socket.emit('solicitar-ticket', null, (ticket) => {
      setTicket(ticket);
    })

  }

  return (
    <>
      <Row align='center'>
        <Col span={20} align='center' >
          <Title level={1}>
            Presione el botón para generar turno
          </Title>
          <Button
            style={{ 
              height: '10rem', 
              width: '10rem', 
              backgroundColor: '#ffffff', 
              border: 'solid', 
              borderColor: '#031029' 
            }}
            type='primary'
            shape='circle'
            size="large"
            onClick={ nuevoTurno }
          >
            <HandPressIcon style={{ fontSize: '6rem' }} />
          </Button>
        </Col>
      </Row>
      <Row align='center' style={{ marginTop: '2rem'}}>
        {
          ticket && (
            <Col span={20} align='center' >
              <Text strong style={{ fontSize: '1rem' }}>Su turno es el:</Text><br/>
              <Text
                strong  
                type="success"
                style={{ fontSize: '8rem' }}
              >
                {ticket.numero}
              </Text>
            </Col>
          )
        }
      </Row>
    </>
  )
}
