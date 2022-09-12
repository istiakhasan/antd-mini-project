import React from 'react';
import { Button, Form, Input } from 'antd';

const AddUserForm = ({onFinish,formLayout,form,buttonItemLayout}) => {
    return (
        <Form

          
          onFinish={onFinish}
          layout={formLayout}
          form={form}

          initialValues={{
            layout: formLayout,
           
          }}

        >


          <Form.Item  name="name" label="Name">
            <Input   placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="age" style={{ marginBottom: "20px" }} label="Age">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item  {...buttonItemLayout}>
            <Button type="primary" htmlType='submit'>Add</Button>
          </Form.Item>
        </Form>
    );
};

export default AddUserForm;