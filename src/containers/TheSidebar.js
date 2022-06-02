import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import Cookies from 'js-cookie';

// import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import navigationA from './_navA'
import navigationSG from './_navSG'
import navigationSDv from './_navSDv'
import navigationSGR from './_navSGR'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
    style={{backgroundColor:'#24476f'}}
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <h4>Hiji Official Store</h4>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={Cookies.get('role')==='1'?navigation: Cookies.get('role')==='2'?navigationA:Cookies.get('role')==='3'?navigationSG:Cookies.get('role')==='4'?navigationSDv:navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
