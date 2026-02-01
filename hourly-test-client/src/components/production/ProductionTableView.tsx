import React, { useEffect, useState } from 'react';
import { 
    Box,
    Paper,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Chip,
    Container, 
    Alert,
    Card
} from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getGridDateOperators, type GridColDef } from '@mui/x-data-grid';
import { ArrowBack, Download, Refresh, Group } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';


const ProductionTableView = () => {
    const {
        csvData,
        lastFetchTimestamp,
        navigateToLogin,
        navigateToEngineering,
        isEngineeringAuthenticated,
        clearData
    } = useAppContext();

    const [filteredData, setFilteredData] = useState(csvData);

    const getRowId = (row: any) => {
        return `${row.TesterID}_${row.Date}_${row.Tester_Start_Time}`.replace(/[^a-zA-Z0-9]/g, '_');
    };

    const columns: GridColDef[] = [
        { 
            field: 'TesterID',
            headerName: 'Tester ID',
            width: 120
        },
        {
            field: 'Date',
            headerName: 'Date',
            width: 120,
            filterOperators: getGridDateOperators()
        },
        {
            field: 'Tester_End_Time',
            headerName: 'End Time',
            width: 180
        },
        {
            field: 'Tester_Result',
            headerName: 'Tester Result',
            width: 150
        },
        {
            field: 'Error_Content',
            headerName: 'Error Content',
            width: 250
        }
    ]

    const { getStorageInfo } = useAppContext();
    const [storageInfo, setStorageInfo] = useState({ size: 0, recordCount: 0 });

    useEffect(() => {
        const loadInfo = async () => {
            const info = await getStorageInfo();
            setStorageInfo(info);
        };
    loadInfo();
    }, []);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        // ToDo: Make Grid UI better
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' elevation={2}>
                <Toolbar>
                    <Group sx={{ mr: 2 }} />
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Production Dashboard
                    </Typography>

                    {lastFetchTimestamp && (
                        <Chip
                            label={`Last fetch: ${new Date(lastFetchTimestamp).toLocaleString()}`}
                            size='small'
                            color="info"
                            sx={{ mr: 2 }} 
                        />
                    )}

                    <Chip 
                        label={`${storageInfo.recordCount} records (${formatBytes(storageInfo.size)})`}
                        size="small"
                        color="info"
                        sx={{ mr: 2 }}
                    />

                    {isEngineeringAuthenticated && (
                        <Button
                            color='inherit'
                            startIcon={<Refresh />}
                            onClick={navigateToEngineering}
                            sx={{ mr: 2 }}
                        >
                            Re-fetch
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ py: 3 }}>
                    {csvData.length === 0 ? (
                        <Alert severity='info'>
                            No data available. Please fetch data from Engineering Dashboard.
                            {isEngineeringAuthenticated && 
                                (<Button onClick={navigateToEngineering} sx={{ ml: 2 }}>
                                    Enter to Engineering Dashboard
                                </Button>
                            )}
                        </Alert>
                    ) : (
                        <>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant='h6'>
                                    Test Results
                                </Typography>
                                <Button startIcon={<Download />} onClick={() => {}}>
                                    Export CSV
                                </Button>
                            </Box>

                            <Card>
                                <Box sx={{ height: 600, width: '100%' }}>
                                    <DataGrid
                        columns={columns}
                        rows={filteredData}
                        getRowId={getRowId}
                        pageSizeOptions={[25, 50, 100]}
                        slots={{ toolbar: GridToolbar }} // fix: GridToolbar deprecation
                        sx={{ // fix: backgroundcolor and borderradius not reflecting
                            '& .MuiDataGrid-root': {
                                border: 'none'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f7fa',
                                borderRadius: 0
                            }
                        }}
                    />
                                </Box>
                            </Card>
                        </>
                    )}
            </Container>

            {/* <Box sx={{ p: 3 }}>
                <Paper elevation={2} sx={{ height: 600 }}>
                    <DataGrid
                        columns={columns}
                        rows={data}
                        getRowId={getRowId}
                        pageSizeOptions={[25, 50, 100]}
                        slots={{ toolbar: GridToolbar }} // fix: GridToolbar deprecation
                        sx={{ // fix: backgroundcolor and borderradius not reflecting
                            '& .MuiDataGrid-root': {
                                border: 'none'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f7fa',
                                borderRadius: 0
                            }
                        }}
                    />
                </Paper>
            </Box> */}
        </Box>
    )
}

export default ProductionTableView;