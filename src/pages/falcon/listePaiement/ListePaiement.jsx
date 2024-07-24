import React, { useEffect, useState, useCallback } from 'react';
import { Breadcrumb, Button, Drawer, Modal, Popconfirm, Popover, Space, Table, Tag, Input, Skeleton } from 'antd';
import {
  PlusCircleOutlined, CreditCardOutlined,
  UserOutlined, DollarOutlined, CalendarOutlined, EyeOutlined
} from '@ant-design/icons';
import axios from 'axios';
import './listePaiement.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import config from '../../../config';

const ListePaiement = () => {
  const DOMAINFALCON = config.REACT_APP_SERVER_DOMAIN_FALCON;
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initial value should be true
  const scroll = { x: 400 };

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: "3%" },
    {
      title: 'Client',
      dataIndex: 'nom_client',
      key: 'nom_client',
      render: (text) => (
        <Tag color='blue'>
          <UserOutlined style={{ marginRight: '5px' }} />
          {text}
        </Tag>
      )
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (text) => (
        <Tag color='green'>
          <DollarOutlined style={{ marginRight: '5px' }} />
          {text} $
        </Tag>
      )
    },
    {
      title: "Date",
      dataIndex: 'date_paiement',
      key: 'date_paiement',
      sorter: (a, b) => moment(a.date_paiement) - moment(b.date_paiement),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag icon={<CalendarOutlined />} color="blue">
          {moment(text).format('DD-MM-yyyy')}
        </Tag>
      )
    },
    {
      title: "Methode",
      dataIndex: 'nom_methode',
      key: 'nom_methode',
      render: (text) => (
        <Tag color="orange">
          <CreditCardOutlined style={{ marginRight: "5px" }} />
          {text}
        </Tag>
      )
    },
    {
      title: 'Effectué par',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Tag color='blue'>
          <UserOutlined style={{ marginRight: '5px' }} />
          {text}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popover title="Voir les détails" trigger="hover">
            <Link to="#" onClick={() => showDrawer(record.id_paiement)}>
              <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
            </Link>
          </Popover>
        </Space>
      )
    }
  ];

  const showDrawer = (id) => {
    // Implement drawer functionality here
  };

  const fetchPaiements = useCallback(async () => {
    try {
      const response = await axios.get(`${DOMAINFALCON}/paiement`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [DOMAINFALCON]);

  useEffect(() => {
    fetchPaiements();
  }, [fetchPaiements]);

  const filteredData = data.filter((item) =>
    item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.device?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="listePaiement">
      <div className="liste_wrapper">
        <div className="liste_wrapper-left">
          <h2 className="liste_h2">FALCON : Paiement</h2>
        </div>
        <div className="liste_wrapper-right">
          <Input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Recherche..."
            className="product-search"
          />
        </div>
      </div>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={isLoading}
          scroll={scroll}
          className='table_client'
          rowKey="id_paiement"
        />
      )}
    </div>
  );
};

export default ListePaiement;
