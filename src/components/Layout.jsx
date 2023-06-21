import NavBar from "./NavBar";
import SideBar from "./SideBar";

function Layout({children}) {
  return (
    <>
      <NavBar/>
      <div id="layoutSidenav">
        <SideBar/>
        <div id="layoutSidenav_content">
          <main>
            {children}
            </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2022
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
export default Layout
