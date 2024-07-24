import { DollarOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Space, Table, Popover,Tag,Input, Skeleton} from 'antd';
import axios from 'axios';
import config from '../../../config';
import moment from 'moment';

const DepenseNdoe = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    // const [open, setOpen] = useState(false);
    // const [openDetail, setOpenDetail] = useState(false);
    // const [dateData, setDateData] = useState('');


    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
       {
            title: 'Jour',
            dataIndex: 'jour',
            key: 'jour',
            sorter: (a, b) => a.jour - b.jour,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color="blue" icon={<CalendarOutlined />}>
                {record.jour}
              </Tag>
            ),
          },
          {
            title: 'Date',
            dataIndex: 'date_depense',
            key: 'date',
            sorter: (a, b) => moment(a.date_depense) - moment(b.date_depense),
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag icon={<CalendarOutlined />} color="blue">
                {moment(text).format('DD-MM-yyyy')}
              </Tag>
            ),
          },
           {
            title: 'Montant total dollars',
            dataIndex: 'montant_total_dollars',
            key: 'montant_total_dollars',
            sorter: (a, b) => a.montant_total_dollars - b.montant_total_dollars,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_total_dollars !== null ? 'green' : 'red'} icon={<DollarOutlined />}>
                {record.montant_total_dollars ? record.montant_total_dollars + ' $' : '0' + ' $'}
              </Tag>
            ),
          },
           {
            title: 'Montant total francs',
            dataIndex: 'montant_total_francs',
            key: 'montant_total_francs',
            sorter: (a, b) => a.montant_total_francs - b.montant_total_francs,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_total_francs !== null ? 'green' : 'red'}>
                {record.montant_total_francs !== null ? record.montant_total_francs + ' fc' : '0' + ' fc'}
              </Tag>
            ),
          },
          {
            title: 'Montant total',
            dataIndex: 'montant_total_combine',
            key: 'montant_total_combine',
            sorter: (a, b) => a.montant_total_combine - b.montant_total_combine,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_total_combine !== null ? 'green' : 'red'} icon={<DollarOutlined />}>
                {record.montant_total_combine ? record.montant_total_combine + ' $' : '0' + ' $'}
              </Tag>
            ),
          },
          {
            title: 'Crée par',
            dataIndex: 'createur',
            key: 'createur',
            render: (text) => (
              <Tag color="blue" icon={<UserOutlined />}>
                {text}
              </Tag>
            ),
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <>
                    <Popover title="Voir les détails" trigger="hover">
{/*                         <Link to={`/depenses?date=${format(new Date(record?.date_depense),'yyyy-MM-dd')}`}> */}
                        {/* <Link onClick={() => handleOkDetail(record.date_depense)}>
                            <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                        </Link> */}
                    </Popover> 
                </>
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/depenses`);
            setData(data);
            setIsLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      const filteredData = data?.filter((item) =>
        item.jour?.toLowerCase().includes(searchValue.toLowerCase())
      );

  return (
    <>
        <div className="listePaiement">
        <div className="liste_wrapper">
            <div className="liste_wrapper-left">
            <h2 className="liste_h2">NDOE : dépense</h2>
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
    </>
  )
}

export default DepenseNdoe