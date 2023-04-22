import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import HeaderSideBar from '../HeaderSideBar/HeaderSideBar';
import SideBar from '../SideBar/SideBar';
import styles from './index.module.css';
import axios from 'axios';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const TopicTable = () => {
  const { typeSlug, levelSlug } = useParams();
  const columns = [
    // { field: '_id', headerName: 'ID', width: 210 },
    { field: 'name', headerName: 'Topic', width: 250 },
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
      width: 400,
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
          <Button href={`/types/${typeSlug}/levels/${levelSlug}/topics/${p.value}`} style={{marginLeft: 10}} variant='contained' color='warning'>
            Edit
          </Button>
          <Button onClick={() => deleteTopic(p.value)} style={{marginLeft: 10}} variant='contained' color='error'>
            Delete
          </Button>
        </div>
      ),
    },
    
  ];

  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(`http://localhost:5000/api/types/${typeSlug}/levels/${levelSlug}/topics`);

    if (data.data.err) {
      setState(null);
      return;
    }

    setState({ ...state, data: data.data });
  };

  const deleteTopic = async (slug) => {
    if (window.confirm('Delete this topic')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/types/${typeSlug}/levels/${levelSlug}/topics/${slug}`
        );
        alert('Delete Successfully!');
        getData();
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.leftContent}>
        <SideBar />
      </div>
      <div className={styles.rightContent}>
        <HeaderSideBar />
        <Button href={`/types/${typeSlug}/levels/${levelSlug}/topics/create`} variant='contained' color='success' style={{ marginBottom: 20, marginRight: 15, float: 'right' }}>
          Add Topic
        </Button>
        <div style={{clear: 'both'}}></div>

        <DataGrid
          columns={columns}
          rows={state.data}
          getRowId={(row) => row._id}
          autoHeight
          pageSize={10}
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

export default TopicTable;
