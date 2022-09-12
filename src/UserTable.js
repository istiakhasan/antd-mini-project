import { Table } from 'antd';
import React from 'react';

const UserTable = ({ columns, data }) => {
    console.log(data,"from table component")
    return (
        <div>
            <Table
                bordered
                size='small'
                columns={columns}
                dataSource={data}
                
            />
        </div>
    );
};

export default UserTable;