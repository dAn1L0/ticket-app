import { Layout, Menu } from 'antd';
import {
  FileDoneOutlined,
  NodeIndexOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CrearTurnoPage } from './CrearTurnoPage';
import { IngresarPage } from './IngresarPage';
import { TurnosAtendiendoPage } from './TurnosAtendiendoPage';
import { EscritorioPage } from './EscritorioPage';
import { useContext } from 'react';
import { UiContext } from '../context/UIContext';

const { Content, Footer, Sider } = Layout;


export const RouterPage = () => {

  const navigate = useNavigate()
  const {ocultarMenu} = useContext(UiContext)

  const menuItems = [
    {
      key: '1',
      icon: <UserAddOutlined />,
      label: 'Ingresar',
      onClick: () => { navigate('/ingresar') }
    },
    {
      key: '2',
      icon: <NodeIndexOutlined />,
      label: 'Turnos',
      onClick: () => { navigate('/turnos') }
    },
    {
      key: '3',
      icon: <FileDoneOutlined />,
      label: 'Crear turno',
      onClick: () => { navigate('/nuevo') }
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
        <Sider
          hidden={ocultarMenu}
          // trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo">

          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '1.5rem 1rem' }} >
            <div className="site-layout-background" style={{ padding: '1rem', minHeight:'100%', minWidth: '100%' }} >
              <Routes>
                <Route exact path="/ingresar" element={<IngresarPage />} />
                <Route exact path="/turnos" element={<TurnosAtendiendoPage />} />
                <Route exact path="/nuevo" element={<CrearTurnoPage />} />
                
                <Route exact path="/escritorio" element={<EscritorioPage />} />
                <Route path="*" element={<Navigate to={'/ingresar'} replace={true} />} />
              </Routes>
            </div>
          </Content>
          <Footer 
            style={{
              cursor: 'default', 
              backgroundColor:'#062359', 
              color: '#DCE8CC',
              textAlign: 'center', 
              height: '2rem', 
              width: '100%',
              padding: '0.3rem 0 1.5rem 0'
              }} 
          >
            ©2022 Created by Danilo Ch. Cabrera
          </Footer>
        </Layout>
    </Layout>
  )
}
