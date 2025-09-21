import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{user.role === 'ngo' ? 'NGO Dashboard' : 'Donor Dashboard'}</h1>
      {user.role === 'ngo' ? (
        <div className="space-y-2">
          <Section title="Your Campaigns">
            <p className="text-gray-600 text-sm">Coming soon: create, edit, and track campaigns.</p>
          </Section>
          <Section title="Received Donations">
            <p className="text-gray-600 text-sm">Coming soon: list and analytics.</p>
          </Section>
        </div>
      ) : (
        <div className="space-y-2">
          <Section title="Donation History">
            <p className="text-gray-600 text-sm">Coming soon: your past donations and totals.</p>
          </Section>
          <Section title="Supported Campaigns">
            <p className="text-gray-600 text-sm">Coming soon: the campaigns you’ve backed.</p>
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </section>
  )
}
