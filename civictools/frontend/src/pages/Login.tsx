import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import { useTranslation } from 'react-i18next'
import { pb } from '../pb'
import { teacher } from '../store'
import type { RecordModel } from 'pocketbase'

export function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [oidcEnabled, setOidcEnabled] = useState(false)
  const [, navigate] = useLocation()

  useEffect(() => {
    pb.collection('users').listAuthMethods()
      .then(m => setOidcEnabled(m.oauth2.providers.some(p => p.name === 'oidc')))
      .catch(() => {})
  }, [])

  async function handleSubmit(e: Event) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const auth = await pb.collection('users').authWithPassword(email, password)
      teacher.value = auth.record as RecordModel
      navigate('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleKeycloakLogin() {
    setError(null)
    setLoading(true)
    try {
      const auth = await pb.collection('users').authWithOAuth2({ provider: 'oidc' })
      teacher.value = auth.record as RecordModel
      navigate('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="page max-w-[380px]">
      <h1>{t('appName')}</h1>
      <div class="card">
        <h2>{t('login.title')}</h2>
        <form onSubmit={handleSubmit} class="flex flex-col gap-3">
          <input
            type="email"
            placeholder={t('login.email')}
            value={email}
            onInput={e => setEmail(e.currentTarget.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder={t('login.password')}
            value={password}
            onInput={e => setPassword(e.currentTarget.value)}
            required
          />
          {error && <p class="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? t('login.submitting') : t('login.submit')}
          </button>
        </form>
        {oidcEnabled && (
          <>
            <p class="text-center my-3 text-gray-400 text-[13px]">
              {t('login.or')}
            </p>
            <button onClick={handleKeycloakLogin} disabled={loading} class="w-full">
              {t('login.keycloak')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
