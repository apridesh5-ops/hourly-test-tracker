import { useState } from 'react';
import { Box,
         Card,
         CardContent,
         Typography,
         Button,
         TextField,
         Alert,
         Container,
         Paper,
         Divider,
         Avatar,
         InputAdornment,
         IconButton } from '@mui/material';
import { Engineering,
         Group,
         Lock,
         Visibility,
         VisibilityOff,
         Timeline } from '@mui/icons-material';


interface LoginType {
    onLogin: (user: { 
        type: 'engineering' | 'production';
        authenticated: boolean
    }) => void
} 

const LoginPage = ({ onLogin }: LoginType) => {
    const [loginType, setLoginType] = useState<'engineering' | 'production' | null>(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEngineeringLogin = async () => {
        setLoading(true);

        // simulate authentication
        setTimeout(() => {
            if (password === 'admin123') {
                onLogin({ type: 'engineering', authenticated: true });
            } else {
                setError('Invalid password! Please try again.');
            }
            setLoading(false);
        }, 500);
    };

    const handleProductionLogin = () => {
        setTimeout(() => {
            onLogin({ type: 'production', authenticated: true })
        }, 500);
    };

    if (loginType === 'engineering') {
        return (
            <Container maxWidth='sm'>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            width: '100%',
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4}}>
                            <Avatar sx={{ mx: 'auto',
                                          mb: 2,
                                          bgcolor: 'primary.main',
                                          width: 56,
                                          height: 56
                            }}>
                                <Engineering fontSize='large' />
                            </Avatar>
                            <Typography variant='h4' gutterBottom>
                                Engineering Portal
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                Administrative Access Required
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={(e) => { e.preventDefault();
                                               handleEngineeringLogin();
                            }}>
                            <TextField 
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                                error={!!error}
                                disabled={loading}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Lock color='action'/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge='end'>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={{ mb: 2 }}
                            />

                            {error && (
                                <Alert severity='error' sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Box sx={{ display: 'flex', gap: 2}}>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={() => setLoginType(null)}
                                    size='large'
                                >
                                    Back
                                </Button>

                                <Button
                                    variant='contained'
                                    type='submit'
                                    disabled={!password || loading}
                                    fullWidth
                                    size='large'
                                >
                                    {loading ? 'Authenticating...' : 'Login'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth='md'>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4
                }}>
                <Card
                    elevation={3}
                    sx={{
                        width: '100%',
                        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
                    }}>
                    <CardContent sx={{ p: 6 }}>
                        <Box sx={{ textAlign: 'center', mb: 6}}>
                            <Avatar sx={{
                                mx: 'auto',
                                mb: 3,
                                bgcolor: 'primary.main',
                                width: 80
                            }}>
                                <Timeline fontSize='large' />
                            </Avatar>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                Hourly Test Tracker
                            </Typography>
                            <Typography variant='h6' color='text.secondary'>
                                Select your access level to continue
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row'}}}>
                            <Paper
                                elevation={2}
                                sx={{
                                    flex: 1,
                                    p: 4,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 3
                                    }
                                }}
                                onClick={() => setLoginType('engineering')}
                            >
                                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main', width: 64, height: 64}}>
                                    <Engineering fontSize='large' />
                                </Avatar>
                                <Typography variant='h5' gutterBottom>
                                    Engineering
                                </Typography>
                                <Typography variant='body1' color='text.secondary' gutterBottom>
                                    Administrative access with full system controls
                                </Typography>
                                <Box sx={{ mt: 3}}>
                                    <Button variant='contained' size='large' fullWidth>
                                        Admin Login
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default LoginPage;