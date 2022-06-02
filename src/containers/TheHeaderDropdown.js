import React from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {
  // CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = (props) => {
  // const {history} = props;
  function Logout(){
    Cookies.remove('token');
    window.location.reload();
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          {/* <CImg
            src={'avatars/1.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          /> */}
          <CIcon name="cil-user" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Akun</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Pengaturan
        </CDropdownItem> */}
        
        <CDropdownItem onClick={()=>Logout()}>
              {/* <CIcon name="cil-account-logout" className="mfe-2" /> */}
              Logout
          </CDropdownItem>
       
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
