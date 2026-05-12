import { Alert } from '@mui/material'

const Notification = ({ message, type = 'error' }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert severity={type} className={type} sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}

export default Notification
