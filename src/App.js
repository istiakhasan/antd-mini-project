import { Alert, Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import AddUserForm from './AddUserForm';
import EditModal from './EditModal';
import UserTable from './UserTable';
const getUserDAta = () => {
  const getUser = localStorage.getItem('user')
  let data = []
  if (getUser) {
    data = JSON.parse(getUser)

    return data
  }
  else {
    return data = []
  }

}

const App = () => {



  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("inline");
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null)


  const [data, setData] = useState(getUserDAta())

  console.log(data, "after update ")


  const handleDelete = (key) => {

    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    localStorage.setItem('user', JSON.stringify(newData))
  };


  const buttonItemLayout = null;



  const onFinish = async (values) => {

    setError(false)


    const isExist = data.find(item => item.name === values.name && item.age === values.age)
    if (isExist) {

      setError(true)
      form.resetFields()
      return
    }
    let max;


    const maxKey = data.map(item => item.key)



    max = Math.max(...maxKey, 0)




    const newDAta = {
      ...values, key: max + 1 || 1
    }



    setData([...data, newDAta])
    localStorage.setItem('user', JSON.stringify([...data, newDAta]))
    form.resetFields()



  };




  const showModal = (user) => {
    setEditUserData(user)
    setIsModalOpen(true);
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "33%",
      align: 'center'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: "33%",
      align: "center"


    },

    {
      title: 'Action',
      dataIndex: '',
      width: "33%",
      align: 'center',

      key: 'x',
      render: (_, record) => <span onClick={() => handleDelete(record.key)}>
        <Button type='danger' style={{ margin: "0 auto", display: "block" }} >Delete</Button>
      </span>,
    },
    {
      title: 'Edit',
      dataIndex: '',
      width: "33%",
      align: 'center',

      key: 'x',
      render: (_, record) =>
        <Button type="primary"

          onClick={() => showModal(record)}>
          Edit
        </Button>
      ,
    },
  ];

  return (
    <>
      <div style={{ width: "60%", margin: "20px auto" }}>
        {editUserData && <EditModal getUserDAta={getUserDAta} data={data} setData={setData} setEditUserData={setEditUserData} isModalOpen={isModalOpen} editUserData={editUserData} setIsModalOpen={setIsModalOpen} />}

        <AddUserForm onFinish={onFinish} formLayout={formLayout} form={form} buttonItemLayout={buttonItemLayout} />
        
        {error && <Alert message="User already added " style={{ width: "67%" }} type="error" showIcon closable />}
      </div>
      <div style={{ width: '90%', margin: "20px auto" }}>
        <UserTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default App;