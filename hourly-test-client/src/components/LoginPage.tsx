import { useState } from 'react';
import { Button, Card, CardContent, Typography, Box, TextField, Alert, InputAdornment, IconButton} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
    const [loginType, setLoginType] = useState<'engineering' | 'production' | null>(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
 
    if (loginType === 'engineering' && !isAuthenticated) {
        return (
            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ backgroundColor: "#5353c6"}}
                >
                <Card sx={{ minWidth: 400 }}>
                    <CardContent>
                        <Typography variant='h5' gutterBottom align='center'>
                            Engineering Login
                        </Typography>
                        <Typography variant='body2' gutterBottom align='center' color='text.secondary'>
                            Enter admin password
                        </Typography>

                        <Box component="form" 
                             onSubmit={(e) => { e.preventDefault();
                                                handleEngineeringLogin();}}>
                            <TextField
                                label="Password" 
                                type={showPassword ? 'text' : 'password'}
                                fullWidth     
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                                error={!!error}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Password Visibilty"
                                                    onClick={handlePasswordVisibilty}
                                                    edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />

                            {error && (
                                <Alert severity='error' sx={{ mt: 1}}>
                                    {error}
                                </Alert>
                            )}

                            <Box display="flex" gap={2} mt={3}>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={() => setLoginType(null)}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    fullWidth
                                    disabled={!password}>
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>       
            </Box>
        )
    }

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
            sx={{
                backgroundColor: 'gray'
            }}>
            <Card sx={{ minWidth: 400}}>
                <CardContent>
                    <Typography variant='h4' gutterBottom align='center'>
                        Hourly Test Tracker
                    </Typography>
                    <Typography variant="body1" gutterBottom align='center' color='text.secondary'>
                        Select your login type  
                    </Typography>

                    <Box 
                        display="flex" 
                        flexDirection="column"
                        gap={2}
                        mt={3}>
                        <Button 
                            variant='contained'
                            onClick={() => setLoginType('engineering')}
                            sx={{
                                bgcolor: 'grey.700',
                                '&:hover': {
                                    bgcolor: 'grey.800',
                                }
                            }}>
                            Engineering
                        </Button>
                        <Button 
                            variant='contained' 
                            onClick={() => setLoginType('production')}
                            sx={{
                                bgcolor: 'black',
                                '&:hover': {
                                    bgcolor: '#333333',
                                }
                            }}>
                            Production
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </Box>
    )
}

export default LoginPage;