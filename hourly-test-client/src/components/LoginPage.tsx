import { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

export const LoginPage = () => {
    const [loginType, setLoginType] = useState<'engineering' | 'production' | null>(null);

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