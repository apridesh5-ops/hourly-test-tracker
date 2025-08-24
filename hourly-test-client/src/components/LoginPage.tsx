import { useState } from 'react';
import { Button, Card, CardContent, Typography, Box, TextField, Alert} from '@mui/material';

export const LoginPage = () => {
    const [loginType, setLoginType] = useState<'engineering' | 'production' | null>('engineering');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

                        <Box component="form" >
                            <TextField
                                label="Password" 
                                type='password'
                                fullWidth     
                                value={password}
                                margin="normal"
                                required
                                error={!!error}
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