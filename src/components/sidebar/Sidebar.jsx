import { Menu, Timeline } from 'antd';
import { ShoppingCartOutlined, ClusterOutlined, PoweroffOutlined,  HomeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './sidebar.scss';
import logo from './../../assets/illustration.png';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import config from '../../config';
import axios from 'axios';
/* import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/userRedux'; */

const { SubMenu, Item } = Menu;

const Sidebar = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [openKeys, setOpenKeys] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
/*   const dispatch = useDispatch(); */
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
/*   const isSidebarOpen = useSelector((state) => state.user?.isSidebarOpen); */
  const [data, setData] = useState([]);
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleLinkClick = () => {
/*     dispatch(toggleSidebar()); */
  };

  const Logout = async () => {
    try {
      await axios.post(`${DOMAIN}/users/logout`);
      setCurrentUser(null);
      localStorage.setItem('persist:root', JSON.stringify(currentUser));
/*       toast.success('Déconnexion réussie !'); */
      navigate('/login');
      window.location.reload();
    } catch (error) {
/*       toast.error('Erreur lors de la déconnexion.'); */
    }
  };

  const fetchMenu = useCallback(async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/menu/menuAll`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, [DOMAIN]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <div className='sidebar' >
      <div className="sidebar_icons">
         <img src={logo} className='sidebar_img' alt="Logo" /> 
      </div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        className="menu-custom"
        style={{ width: '100%', backgroundColor: 'linear-gradient(180deg, #0D1B2A, #13AED8)', color: '#13AED8' }}
        theme="dark"
      >
        <Item key="accueil" icon={<HomeOutlined style={{ fontSize: '17px'}} />} style={{ fontSize: '14px', letterSpacing: '1px' }}>
          <Link to={'/'} onClick={handleLinkClick}>
            Accueil
          </Link>
        </Item>
        <SubMenu key="vente" icon={<ShoppingCartOutlined style={{ fontSize: '17px' }} />} title="Ndoé" style={{ fontSize: '14px', letterSpacing: '1px' }}>
          <Item key="1">
            <Link to={'/liste_vente_ndoe'} style={{display:'flex', alignItems:'center'}} onClick={handleLinkClick}>
              <Timeline.Item dot={<span className="custom-dot" />} />
              Liste des ventes
            </Link>
          </Item>
          <Item key="2">
            <Link to={'/Liste_depense_ndoe'} style={{display:'flex', alignItems:'center'}} onClick={handleLinkClick}>
              <Timeline.Item dot={<span className="custom-dot" />} />
              Liste des depenses
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="paiement" icon={<ClusterOutlined style={{ fontSize: '17px' }} />} title="Falcon" style={{ fontSize: '14px', letterSpacing: '1px' }}>
          <Item key="4">
            <Link to={'/liste_paiement'} style={{display:'flex', alignItems:'center'}} onClick={handleLinkClick}>
              <Timeline.Item dot={<span className="custom-dot" />}  />
              Liste des paiements
            </Link>
          </Item>
          <Item key="5">
            <Link to={'/liste_depense'} style={{display:'flex', alignItems:'center'}} onClick={handleLinkClick}>
              <Timeline.Item dot={<span className="custom-dot" />} />
                liste des depenses
            </Link>
          </Item>
        </SubMenu>
        <Item key="deconnecter" icon={<PoweroffOutlined style={{ fontSize: '17px' }} />} style={{ fontSize: '14px', letterSpacing: '1px' }} onClick={Logout}>
          Déconnecter
        </Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
