import React, { useState, useContext } from 'react';
import { DataContext } from '../../API/data';
import { IoMdMenu } from "react-icons/io";
import classes from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const data = useContext(DataContext);

    // Function to handle the sidebar toggle
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    //logged data

    //data.data.forEach((item) => console.log('map test ', item));

    // Determine the class to use based on the isOpen state
    const sidebarClass = isOpen ? 'open' : 'close';

    return (
        <div className={classes['sidebar-container']}>
            <IoMdMenu onClick={toggleSidebar} className={classes['menu-icon']}/>
            <div className={`${classes.sidebar} ${classes[sidebarClass]}`}>
                <div className={classes['name-container']}>
                <Link to={`../MainMinerStats`}>
                  <h1>Home</h1>
                </Link>
                </div>
                {data.data.map((item, index) => (
                    <div key={index} className={classes['name-container']}>
                      <Link to={`/Miner/${item.minerId}`}>
                        <h1>Miner: {item.workerName}</h1> 
                      </Link>
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
