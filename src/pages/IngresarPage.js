import { SaveTwoTone } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAgenteStorage } from '../helpers/getAgenteStorage';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text } = Typography

export const IngresarPage = () => {


  const navigate = useNavigate()
  useHideMenu(false)
  const [usuario] = useState(getAgenteStorage())
  
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFinish = ({agente, ventanilla}) => {

    localStorage.setItem('agente', agente)
    localStorage.setItem('ventanilla', ventanilla)
    navigate('/escritorio')

  }

  const onFinishFailed = (errorInfo) => {
    console.log('failed', errorInfo);
  }

  if (usuario.agente && usuario.ventanilla) {
    return (<Navigate to={'/escritorio'} replace={true}/>)
  }

  return (
    <>
      <Title>
        Ingresar 
      </Title>
      <Text>

      </Text>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
          ventanilla: "1"
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        size={"large"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}

      >
        <Form.Item 
          label="Agente"
          name="agente"
          tooltip="Nombre/Usuario/Nick"
          rules={[{ required: true, message: 'Nombre agente obligatorio'}]}
        >
          <Input placeholder="Nombre" autoComplete='off' />
        </Form.Item>
        <Form.Item
          required
          label="Ventanilla"
          name='ventanilla' 
          tooltip="Número de ventanilla"
          rules={[{ required:true, message:'Valor obligatorio' }]}
        >
          <InputNumber min={1} max={90} style={{ width: '100%' }}/>
        </Form.Item>
        <Form.Item>
          <Button 
            style={{ width: '7.5rem' }}
            type="primary"
            htmlType='submit'
            shape='round'
          >
            <SaveTwoTone twoToneColor="#13EC79" />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
