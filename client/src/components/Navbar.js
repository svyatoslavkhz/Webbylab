import React from 'react';
import {NavLink} from 'react-router-dom'


export const Navbar = () => {

    return (
        <div>
            <nav>
                <div class="nav-wrapper teal lighten-2">
                <a href="/" class="brand-logo">Video</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/">Главная</NavLink></li>
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/import">Импортировать</NavLink></li>
                </ul>
                </div>
            </nav>
        </div>
    )
}