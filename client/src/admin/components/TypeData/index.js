import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import SideBar from '../SideBar/SideBar';
import styles from './index.module.css';
import axios from 'axios';
import { Button } from '@mui/material';

const TypeTable = () => {
  const columns = [
    // { field: '_id', headerName: 'ID', width: 210 },
    { field: 'name', headerName: 'Type', width: 150 },
    {
      field: 'image',
      headerName: 'Image',
      sortable: false,
      filterable: false,
      width: 250,
      renderCell: (p) => <img src={p.value} style={{ maxWidth: '100%' }} />,
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 500,
      renderCell: (p) => <p dangerouslySetInnerHTML={{__html: p.value.substring(0, p.value.indexOf("</p>") + 4)}} />,
    },
    {
      headerName: 'Actions',
      field: 'slug',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (p) => (
        <div>
          <Button
            href={`/types/${p.value}/levels`}
            variant='contained'
            color='info'
          >
            Levels
          </Button>
          <Button
            href={`/types/${p.value}`}
            style={{ marginLeft: 10 }}
            variant='contained'
            color='warning'
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const [state, setState] = useState({
    types: [],
  });

  const getTypes = async () => {
    const data = await axios.get(`http://localhost:5000/api/types`);

    if (data.data.err) {
      setState(null);
      return;
    }

    setState({ ...state, types: data.data });
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.leftContent}>
        <SideBar />
      </div>
      <div className={styles.rightContent}>
        <HeaderSideBar />
        <DataGrid
          columns={columns}
          rows={state.types}
          getRowId={(row) => row._id}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            mr: 2,
            minWidth: 300,
          }}
        />
      </div>
    </div>
  );
};

export default TypeTable;
