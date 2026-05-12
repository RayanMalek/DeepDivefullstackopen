import { TextField, Button, Box, Typography } from '@mui/material'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) => (
  <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 3 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Login
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        label="username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="password"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        login
      </Button>
    </form>
  </Box>
)

export default LoginForm
