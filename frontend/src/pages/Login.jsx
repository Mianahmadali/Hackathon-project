import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { Form, Input, Button, message } from 'antd'
import client from '../api/client'

function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await client.post('/auth/login', {
        email: values.email,
        password: values.password
      })
      
      if (response.data) {
        message.success('Login successful!')
        // Store user data or token if needed
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        // Redirect to dashboard based on user role
        if (response.data.user?.role === 'ngo') {
          navigate('/dashboard/ngo')
        } else {
          navigate('/dashboard/donor')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      message.error(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error('Please fill in all required fields correctly.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Welcome back</h1>
        <p className={styles.sub}>Login to manage your donations and campaigns.</p>
        <Form 
          form={form}
          layout="vertical" 
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              placeholder="you@example.com" 
              type="email" 
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item 
            label="Password" 
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password 
              placeholder="••••••••" 
              autoComplete="current-password"
            />
          </Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large"
            loading={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <p className={styles.alt}>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  )
}

export default Login
