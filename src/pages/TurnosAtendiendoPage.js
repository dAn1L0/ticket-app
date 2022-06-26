import { Col, Row,List, Typography, Card, Tag, Divider } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography

export const TurnosAtendiendoPage = () => {

  useHideMenu(true)

  const {socket} = useContext(SocketContext)
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    socket.on('tickets-en-ventanillas', (asignados) => {
      setTickets(asignados)
    })
    return() => {
      socket.off('tickets-en-ventanillas')
    }
  }, [socket])

  useEffect(() => {
    getUltimos().then( setTickets )
  }, [])

  
  return (
    <>
      <Title level={1}> Atendiendo los turnos</Title>
      {
        (tickets.length > 0) ? (
          <Row>
            <Col flex={1} style={{ margin: '0.5rem'}}>
              <List
                size="default"
                style={{ width:'100%', marginTop:'0.1rem', }}
                itemLayout="horizontal"
                dataSource={tickets.slice(0,3)}
                renderItem={(item) => (
                  <List.Item
                    style={{ padding:'0', border:'0',}}
                  >
                    <Card
                      size='small'
                      style={{ width:'100%',}}
                      actions={[
                        <Tag color={"darkblue"} style={{ fontSize: '1.2rem'}}>Ventanilla: <b>{item.ventanilla}</b></Tag>,
                      ]}
                    >
                      <Title 
                        level={1}
                      >
                        Nro. { item.numero }
                      </Title>
                    </Card>
                  </List.Item>
                )}
              />
            </Col>
            <Col flex={1} style={{ margin: '0.5rem'}}>
              <Divider> <b>Historial</b> </Divider>
              <List
                size='default'
                dataSource={tickets.slice(3)}
                style={{ width:'100%', marginTop:'0.1rem', }}
                renderItem={ item => (
                  <List.Item>
                    <List.Item.Meta 
                      title={<b>{`Turno Nro. ${ item.numero }`}</b>}
                      description={
                        <>
                          <Text type='secondary'>En la ventanilla: </Text>
                          <Tag color='purple'> <b>{item.ventanilla}</b></Tag>
                          <Text type='secondary'>Agente: </Text>
                          <Tag color='gold'> <b>{item.agente}</b></Tag>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        ) : (
          <Text strong > <Divider>Sin turnos</Divider> </Text>
        )
      }
    </>
  )
}
