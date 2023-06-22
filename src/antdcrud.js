import { Button, Form, Input, InputNumber } from 'antd';
import { useState } from "react";
import { Table } from 'antd';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */
export const FormApp = () => {
    const [form] = Form.useForm();
    const initial = {
        fistName: "",
        introduction: "",
        mail: "",
        website: "",
        id: "",
    };
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || []);
    const onFinish = (values) => {
        console.log(values);
        setData([...data, { ...values, id: Date.now() }])
        localStorage.setItem("data", JSON.stringify([...data, values]));
    };
    console.log(data);
    const handleDelete = (id) => {
        const deleteData = data.filter((item) => item.id !== id);
        setData(deleteData);
        localStorage.setItem("delete", JSON.stringify(deleteData));
    }
    const handleEdit = (index) => {
        const editData = data.find((item) => item.id === index);
        // setData(editData);
        console.log(editData)
        // form.setFields(Object.keys(editData));
        form.setFieldsValue({ fistName: editData.fistName, introduction: editData.introduction, age: editData.age, mail: editData.mail, website: editData.website });
        console.log("edit", editData);
        // form.setFieldsValue({
        //     fistName: editData.fistName, introduction:editData.introduction,mail:editData.mail,website:editData.website,
        // })
        console.log(form);
    }
    const columns = [
        {
            title: 'fistName',
            dataIndex: 'fistName',
        },
        {
            title: 'introduction',
            dataIndex: 'introduction',
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'mail',
            dataIndex: 'mail',
        },
        {
            title: 'website',
            dataIndex: 'website',
        },
        {
            title: 'delete',
            dataIndex: '',
            render: (index) => <Button type="primary" danger ghost onClick={() => handleDelete(index.id)}>
                delete
            </Button>
        },
        {
            title: 'edit',
            dataIndex: '',
            render: (index, item) => {
                console.log(item)
                return <Button type="primary" ghost onClick={() => handleEdit(item.id)}>
                    edit
                </Button>
            }
        }
    ];
    return (
        <>
            <Form
                form={form}
                initialValues={initial}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name='fistName'
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='mail'
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='age'
                    label="Age"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 99,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name='website' label="Website">
                    <Input />
                </Form.Item>
                <Form.Item name='introduction' label="Introduction">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5,
                }}
            />
        </>
    )
};
export default FormApp;