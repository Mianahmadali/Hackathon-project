import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.scss'
import { Form, Input, Button, Select, message } from 'antd'
import client from '../api/client'

function Signup() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await client.post('/auth/register', {
        name: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role
      })
      
      if (response.data) {
        message.success('Account created successfully! Please login.')
        // Redirect to login page
        navigate('/login')
      }
    } catch (error) {
      console.error('Signup error:', error)
      message.error(error.response?.data?.message || 'Signup failed. Please try again.')
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
        <h1>Create an account</h1>
        <p className={styles.sub}>Join DonateHub as a Donor or NGO.</p>
        <Form 
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item 
            label="Full Name" 
            name="fullName"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { min: 2, message: 'Name must be at least 2 characters!' }
            ]}
          >
            <Input 
              placeholder="Jane Doe" 
              autoComplete="name"
            />
          </Form.Item>
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
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item 
            label="Role" 
            name="role"
            rules={[
              { required: true, message: 'Please select your role!' }
            ]}
          >
            <Select 
              placeholder="Select your role" 
              options={[
                { value: 'donor', label: 'Donor' }, 
                { value: 'ngo', label: 'NGO' }
              ]} 
            />
          </Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large"
            loading={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </Form>
        <p className={styles.alt}>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  )
}

export default Signup
