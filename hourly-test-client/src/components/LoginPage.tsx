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

const LoginPage = () => {
    const [loginType, setLoginType] = useState<'engineering' | 'production' | null>('engineering');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEngineeringLogin = () => {
        // replace with actual auth logic
        const correctPassword = 'engineering_user'; // store this securly in env variables

        if(password === correctPassword) {
            setIsAuthenticated(true);
            setError('');
            //redirect to engineering dashboard
        } else {
            setError('Invalid Password!');
            setPassword('');
        }
    };

    const handleProductionLogin = () => {
        // production login doesn't need password authentication
        setIsAuthenticated(true);
        setLoginType('production');
        // redirect to production form  
    }

    const handlePasswordVisibilty = () => {
        setShowPassword((show) => !show)
    };

    if (loginType === 'engineering') {
        return (
            <Container>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        //py: 4
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            width: '100%',
                            // background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
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
}

export default LoginPage;