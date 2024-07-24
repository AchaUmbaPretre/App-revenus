import './listeDepense.scss'
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Popover, Space, Table, Tag, Input, Skeleton } from 'antd';
import { EyeOutlined,
  DollarOutlined, CalendarOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import config from '../../../config';

const ListeDepense = () => {
    const DOMAINFALCON = config.REACT_APP_SERVER_DOMAIN_FALCON;
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [isLoading, setIsLoading] = useState(true);
    const [depenses, setDepenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [dateDetail, setDateDetail] = useState('')
    

    const fetchDepenses = useCallback(async () => {
        try {
          const response = await axios.get(`${DOMAINFALCON}/depense/depenseAll`);
          setDepenses(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des dépenses:", error);
        } finally {
          setIsLoading(false);
        }
      }, [DOMAINFALCON]);
    
      useEffect(() => {
        fetchDepenses();
      }, [fetchDepenses]);

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: "3%" },
        {
          title: 'Jour',
          dataIndex: 'jour_semaine',
          key: 'jour_semaine',
          render: (text) => (
            <Tag color="orange" icon={<CalendarOutlined />}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Date',
          dataIndex: 'date_depense',
          key: 'date_depense',
          sorter: (a, b) => moment(a.date_depense) - moment(b.date_depense),
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag icon={<CalendarOutlined />} color="blue">
              {moment(text).format('DD-MM-yyyy')}
            </Tag>
          )
        },
        {
            title: 'Dollars',
            dataIndex: 'montant_dollars',
            key: 'montant_dollars',
            sorter: (a, b) => a.montant_dollars - b.montant_dollars,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_dollars !== null ? 'green' : 'red'} icon={<DollarOutlined />}>
                {record.montant_dollars ? record.montant_dollars + ' $' : '0'}
              </Tag>
            ),
          },
          {
            title: 'Franc',
            dataIndex: 'montant_franc',
            key: 'montant_franc',
            sorter: (a, b) => a.montant_franc - b.montant_franc,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_franc !== null ? 'green' : 'red'}>
                {record.montant_franc !== null ? record.montant_franc + ' fc' : '0' + ' fc'}
              </Tag>
            ),
          },
          {
            title: 'Total_depense $',
            dataIndex: 'total_depense',
            key: 'total_depense',
            sorter: (a, b) => a.total_depense - b.total_depense,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.total_depense !== null ? 'green' : 'red'} icon={<DollarOutlined />}>
                {record.total_depense ? record.total_depense + ' $' : '0' + ' $'}
              </Tag>
            ),
          },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Popover title="Voir les détails" trigger="hover">
                <Link onClick={() => showDrawer(record.date_depense)}>
                  <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                </Link>
              </Popover>
            </Space>
          )
        }
      ];

      const showDrawer = (e) => {
/*         setIsDrawerOpen(true);
        setDateDetail(e) */
      };
    

  return (
    <>
                <div className="listePaiement">
            <div className="liste_wrapper">
                <div className="liste_wrapper-left">
                    <h2 className="liste_h2">FALCON : Dépense</h2>
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
                    dataSource={depenses}
                    columns={columns}
                    loading={isLoading}
                    scroll={scroll}
                    className='table_client'
                />
              )}
        </div>
    </>
  )
}

export default ListeDepense