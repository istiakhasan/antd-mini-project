import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const EditModal = ({ isModalOpen, setIsModalOpen, editUserData, data, setData,setEditUserData,getUserDAta }) => {
    useEffect(()=>{

    },[data])

    const [form] = Form.useForm();

    const buttonItemLayout = null;
    const [formLayout, setFormLayout] = useState("inline");



    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async(values) => {
     

        
            try {
              const row = await form.validateFields();
              const newData = [...data];
              const index = newData.findIndex((item) => editUserData.key === item.key);
        
              if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
               
                localStorage.setItem('user',JSON.stringify(newData))
                setEditUserData(null)
              } else {
                newData.push(row);
                setData(newData);
                
              }
            } catch (errInfo) {
              console.log('Validate Failed:', errInfo);
            }
          


    }


    return (
        <div>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        layout: formLayout,
                        name: editUserData.name,
                        age: editUserData.age,
                    }}
                >
                    <Form.Item name="name">
                        <Input placeholder='' />
                    </Form.Item>
                    <Form.Item name="age">
                        <Input placeholder='' />
                    </Form.Item>

                    <Form.Item  {...buttonItemLayout}>
                        <Button type="primary" htmlType='submit'>Update</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EditModal;