import { Button, Col, Form, Input, Row, message } from "antd"
import axios from 'axios'
import React from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { API } from '../global'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
     //const loading = useSelector((state) => state.itemShop.itemSlice)
    //console.log(loading)
    const onFinish = (values) => {
        console.log(values)
        dispatch({ type: "showLoading" })
        axios.post(`${API}/users/login`, values)
            .then((res) => {
                dispatch({ type: "hideLoading" })
                message.success("Login Successful")
                localStorage.setItem("user_data", JSON.stringify(res.data))
                navigate("/home")
            })
            .catch((err) => {
                dispatch({ type: "hideLoading" })
                message.error("Invalid Credentials")
            })
    }

    return (
        <div>
            <Row>
                <Col lg={8} xs={22}>
                    <Form onFinish={onFinish}>
                        <h1 className='text-center'>BigBasket</h1>
                        <h4>Login</h4>
                        <Form.Item name="username" label="User Name">
                            <Input id="username" placeholder="jack@gmail.com" />
                        </Form.Item>

                        <Form.Item name="password" label="Password">
                            <Input id="password" placeholder="jack@123" />
                        </Form.Item>
                        <Button htmlType="submit" type="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login