import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { getAgenteStorage } from '../helpers/getAgenteStorage'
import { useHideMenu } from '../hooks/useHideMenu'

const { Title, Text } = Typography

export const EscritorioPage = () => {

  useHideMenu(false)
  const navigate = useNavigate()
  const [usuario] = useState(getAgenteStorage())
  const {socket} = useContext(SocketContext)
  const [ticket, setTicket] = useState(null)

  const salir = () => {
    localStorage.removeItem('agente')
    localStorage.removeItem('ventanilla')
    navigate('/ingresar')
  }

  const siguienteTicket = () => {
    socket.emit('asignar-siguiente-ticket', usuario, (ticket) => {
      setTicket(ticket)
    })
  }

  if (!usuario.agente || !usuario.ventanilla) {
    return (<Navigate to={'/ingresar'} replace={true}/>)
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title 
            level={1}
          > 
            Ventanilla nro.: 
            <Text 
              strong 
              type="success"
              style={{ marginLeft: '0.5rem' }}
            >
              { usuario.ventanilla || '1'} 
            </Text>
          </Title>
          <Text strong style={{ fontSize: '1.5rem' }}> 
            Agente: 
            <Text 
              strong 
              type="secondary"
              style={{ marginLeft: '11.5rem', color: 'darkblue' }}
            > 
              {usuario.agente || 'Ghost'}
            </Text>
          </Text>
        </Col>
        <Col span={4} align="right">
          <Button
            size='1.5rem'
            shape='round'
            type='danger'
            onClick={salir}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        {
          ticket ? (
            <Col span={24}>
              <Text strong>Se encuentra atendiendo el turno:</Text>
              <Text 
                strong 
                style={{ 
                  fontSize: '2rem', 
                  verticalAlign: 'middle', 
                  border: 'solid', 
                  margin: '1rem', 
                  padding: '0.2rem 0.3rem'}}
              >
                {ticket.numero}
              </Text>
            </Col>
          ) : (
            <Col span={24}>
              <Text strong><Divider>Sin atención</Divider></Text>
            </Col>
          )
        }
      </Row>
      <Row>
        <Col span={24} align="right">
          <Button
            // disabled={!ticket}
            size='large'
            style={{ fontSize: '1.5rem', marginTop: '3rem', padding:'0rem 0.7rem'}}
            onClick={siguienteTicket}
            shape={"round"}
            type={'primary'}
          >
            Siguiente
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  )
}
