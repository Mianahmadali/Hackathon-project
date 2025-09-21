import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Card, Form, InputNumber, Input, Button, message } from 'antd'

function Donate() {
  const [searchParams] = useSearchParams()
  const campaignId = searchParams.get('campaign')
  const [form] = Form.useForm()

  const onFinish = (values) => {
    // Placeholder donate flow
    message.success(`Thanks for donating $${values.amount}${campaignId ? ` to campaign ${campaignId}` : ''}!`)
    form.resetFields()
  }

  return (
    <div style={{ maxWidth: 520, margin: '2rem auto', padding: '0 1rem' }}>
      <Card title={campaignId ? `Donate to Campaign ${campaignId}` : 'Make a Donation'}>
        <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ amount: 50 }}>
          <Form.Item name="amount" label="Amount (USD)" rules={[{ required: true, message: 'Please enter an amount' }]}>
            <InputNumber min={5} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="name" label="Your Name">
            <Input placeholder="Optional" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Donate Now
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Link to="/campaigns">Browse campaigns</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Donate